<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class DishController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Alapértelmezett nyelv magyar, ha nincs megadva
        $language = $request->get('lang', 'hu');
    
        // Az ételek és a megfelelő nyelvű fordítások betöltése
        $dishes = Dish::with(['translations' => function ($query) use ($language) {
            $query->where('language', $language);
        }])->get();
    
        // Csak a releváns fordítást adjuk vissza
        $dishes->each(function ($dish) use ($language) {
            $dish->translation = $dish->translations->firstWhere('language', $language);
            unset($dish->translations); // Eltávolítjuk a teljes translations gyűjteményt
        });
    
        return response()->json($dishes);
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    Log::info('A kért cucc:', $request->toArray());
    $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle the image upload
        $imagePath = $request->file('image')->store('dishes', 'public');

        // Create the new dish record
        $dish = Dish::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'price' => $validatedData['price'],
            'image' => 'storage/' . $imagePath,  // Save the relative image path
        ]);

        return response()->json([
            'message' => 'Dish created successfully',
            'dish' => $dish
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) 
    {
        // Ellenőrizd, hogy az adatbázisban létezik-e a megadott étel
        $dish = Dish::findOrFail($id);
    
        // Adatok validálása
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // A kép nem kötelező
        ]);
    
        // Mezők frissítése
        $dish->name = $validatedData['name'];
        $dish->description = $validatedData['description'];
        $dish->price = $validatedData['price'];
    
        // Ha van új kép
        if ($request->hasFile('image')) {
            // Régi kép törlése (ha van)
            if ($dish->image) {
                $oldImagePath = public_path($dish->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }
    
            // Új kép feltöltése
            $imagePath = $request->file('image')->store('dishes', 'public');
            $dish->image = 'storage/' . $imagePath; // Mentjük az új kép elérési útját
        }
    
        // Adatok mentése az adatbázisba
        $dish->save();
    
        // JSON válasz visszaadása
        return response()->json([
            'message' => 'Dish updated successfully',
            'dish' => $dish,
        ], 200);
    }
                

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dish = Dish::findOrFail($id);

        // Delete the image if it exists
        if ($dish->image) {
            Storage::disk('public')->delete(str_replace('storage/', '', $dish->image));
        }

        // Delete the dish record
        $dish->delete();

        return response()->json(['message' => 'Dish deleted successfully.']);
    }
}
