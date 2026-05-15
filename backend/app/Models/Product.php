<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'sale_price',
        'stock',
        'sku',
        'main_image',
        'scale',
        'condition',
        'release_date',
        'featured',
        'active',
        'category_id',
        'manufacturer_id',
    ];

    protected $casts = [
        'featured'     => 'boolean',
        'active'       => 'boolean',
        'price'        => 'decimal:2',
        'sale_price'   => 'decimal:2',
        'release_date' => 'date',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function manufacturer()
    {
        return $this->belongsTo(Manufacturer::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'product_tags');
    }
}