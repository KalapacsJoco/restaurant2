<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();  // Automatikus big integer ID (unsigned)
            $table->foreignId('order_id')->constrained()->onDelete('cascade');  // Kapcsolat az orders táblával
            $table->foreignId('dish_id')->constrained()->onDelete('cascade');   // Kapcsolat a dishes táblával
            $table->integer('quantity');  // Az étel mennyisége
            $table->decimal('price', 10, 2);  // Az adott tétel ára
            $table->timestamps();  // created_at és updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
