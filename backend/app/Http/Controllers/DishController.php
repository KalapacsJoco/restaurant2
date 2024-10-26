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
    public function index()
    {
        $dishes = Dish::all();
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
    public function update(Request $request, Dish $dish)
{
    // Log::info('Request data:', $request->all());

    // Validate only the provided fields (not all are required)
    $validatedData = $request->validate([
        'name' => 'sometimes|string|max:255',
        'description' => 'sometimes|string',
        'price' => 'sometimes|numeric|min:0',
        // 'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    // Handle image upload if a new image is provided
    if ($request->hasFile('image')) {
        // ... (rest of image handling code)
    }

    // Update only the validated fields
    // Log::info('Validated data before updating:', $validatedData);
    $dish->update($validatedData);
    // Log::info('Dish after updating:', $dish->fresh()->toArray());

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
