<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DishTranslation extends Model
{
    use HasFactory;

    protected $fillable = ['dish_id', 'language', 'name', 'description'];

    public function dish()
    {
        return $this->belongsTo(Dish::class);
    }
}
