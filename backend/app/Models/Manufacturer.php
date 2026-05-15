<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Manufacturer extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'country',
        'description',
        'logo',
        'website',
        'active',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}