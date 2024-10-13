<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use Illuminate\Http\Request;

class DishController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dishes = Dish::all();
        return view('dishes.index', compact('dishes'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Adatok validálása
        $validated = $request->validate([
            'name' => 'required|max:255',
            'description' => 'required|max:255',
            // 'image' => 'required|image',
            'price' => 'required|numeric',
        ]);
    
        // Új dish objektum létrehozása és adatok feltöltése
        $dish = new Dish;
        $dish->name = $validated['name'];
        $dish->description = $validated['description'];
        $dish->price = $validated['price'];
    
        // Ha van kép, mentése
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/dishes', $imageName); // Mentés a public/dishes könyvtárba
            $dish->image = 'storage/dishes/' . $imageName; // Az adatbázisban tárolt elérési út
        }
    
        // Adatok mentése az adatbázisba
        $dish->save();
    
        // Visszatérési érték (pl. JSON válasz)
        return [
            'message' => 'Minden fasza',
            'dish' => $dish
        ];
    }
    


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
