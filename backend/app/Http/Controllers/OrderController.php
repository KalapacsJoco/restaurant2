<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class OrderController extends Controller
{
    public function store(Request $request)
    {
        // Kérjük le a rendeléshez tartozó adatokat
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',  // A felhasználó ID-jának léteznie kell
            'items' => 'required|array',              // A tételek legyenek tömbben
            'items.*.dish_id' => 'required|exists:dishes,id',  // Minden étel ID-nak léteznie kell
            'items.*.quantity' => 'required|integer|min:1',    // Legalább 1 étel rendelése szükséges
            'items.*.price' => 'required|numeric',             // Az étel ára
        ]);

        DB::beginTransaction();  // Tranzakció indítása

        try {
            // 1. Létrehozzuk a rendelést
            $order = Order::create([
                'user_id' => $validated['user_id'],
                'status' => 'pending',  // Alapértelmezett státusz
                'total_price' => array_reduce($validated['items'], function($total, $item) {
                    return $total + ($item['price'] * $item['quantity']); // Összegzés a tételek alapján
                }, 0)
            ]);

            // 2. Hozzáadjuk a rendelés tételeit (order_items)
            foreach ($validated['items'] as $item) {
                OrderItem::create([
                    'order_id' => $order->id,       // A rendelés ID-ja
                    'dish_id' => $item['dish_id'],  // Az étel ID-ja
                    'quantity' => $item['quantity'],// Mennyiség
                    'price' => $item['price'],      // Az adott tétel ára
                ]);
            }

            DB::commit();  // Tranzakció lezárása
                // dd($order);
            return response()->json([
                'message' => 'Rendelés sikeresen létrehozva',
                'order' => $order,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();  // Ha hiba történik, visszavonjuk a tranzakciót
            return response()->json(['error' => 'Rendelés létrehozása sikertelen'], 500);
        }
    }
}
