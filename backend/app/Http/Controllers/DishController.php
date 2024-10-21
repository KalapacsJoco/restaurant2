<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


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
            'image' => 'storage/dishes/' . basename($imagePath),
        ]);

        // $dish->image = asset('storage/' . $dish->image);

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
    // Kérés validálása (csak az új értékekre vonatkozóan)
    $validatedData = $request->validate([
        'name' => 'sometimes|string',
        'description' => 'sometimes|string',
        'price' => 'sometimes|numeric',
        'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    // Kép frissítése, ha szükséges
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('dishes', 'public');
    }

    // Frissítjük a dish adatokat, az új értékekkel felülírva a régieket, ha vannak
    $dish->update(array_merge($dish->toArray(), $validatedData));

    return response()->json([
        'message' => 'Dish updated successfully',
        'dish' => $dish
    ]);
}
    
    
    

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(string $id)
    {
        // Keresd meg a disht az ID alapján
        $dish = Dish::findOrFail($id);
    
        // Ellenőrizd, hogy van-e kép és töröld a képet
        if ($dish->image_path) { // Az image_path mező a kép elérési útját tartalmazza
            Storage::disk('public')->delete($dish->image_path); // Törlés
        }
    
        // Töröld a disht
        $dish->delete();
    
        // Válasz
        return response()->json(['message' => 'Dish deleted successfully.']);
    }
    
    
}
