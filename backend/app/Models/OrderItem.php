<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = ['order_id', 'dish_id', 'quantity', 'price'];

    // Egy rendelési tétel egy rendeléshez tartozik
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Egy rendelési tétel egy ételhez tartozik
    public function dish()
    {
        return $this->belongsTo(Dish::class);
    }
}
