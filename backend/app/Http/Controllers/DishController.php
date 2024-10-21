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

        return $dishes;
     
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->file('image')) {
            $imagePath = $request->file('image')->store('dishes', 'public');
        }

        $dish = Dish::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'image' => $imagePath, // Store the image path
        ]);

        $dish->image = asset('storage/' . $dish->image);

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
    public function update(Request $request, Dish $dish)
    {
        // Kérés validálása
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        // Kép frissítése, ha szükséges
        if ($request->file('image')) {
            $imagePath = $request->file('image')->store('dishes', 'public');
        }
    
        // Frissítjük a dish adatokat
        $dish->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'image' => $imagePath ?? $dish->image, // Csak akkor frissítjük, ha új kép van
        ]);
    
        // return response()->json([
        //     'message' => 'Dish updated successfully', //megvizsgalni a foto kuldeset 
        //     'dish' => $dish
        // ]);

        return response()->json([
            'message' => 'Dish updated successfully',
            'dish' => [
                'name' => $dish->name,
                'description' => $dish->description,
                'image' => base64_encode(file_get_contents($dish->imagePath)),
                'price' => $dish->price
            ]
        ]);
    }
    
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
