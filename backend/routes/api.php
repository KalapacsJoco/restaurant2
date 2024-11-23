<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DishController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::put('/user/{user}', [AuthController::class, 'update']);
// ->middleware('auth:sanctum');

Route::get('/dishes', [DishController::class, 'index']);
Route::post('/dishes', [DishController::class, 'store']);
Route::post('/dishes/{dish}', [DishController::class, 'update']);
Route::delete('/dishes/{dish}', [DishController::class, 'destroy']);

Route::post('/order', [OrderController::class, 'store']);
