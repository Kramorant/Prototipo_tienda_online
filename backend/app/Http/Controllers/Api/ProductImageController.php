<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;

class ProductImageController extends Controller
{
    public function store(Request $request, Product $product)
    {
        $request->validate([
            'image' => 'required|string',
            'order' => 'integer|min:0',
        ]);

        $image = $product->images()->create([
            'image' => $request->image,
            'order' => $request->input('order', 0),
        ]);

        return response()->json($image, 201);
    }

    public function destroy(Product $product, ProductImage $image)
    {
        if ($image->product_id !== $product->id) {
            return response()->json(['message' => 'No encontrado.'], 404);
        }

        $image->delete();

        return response()->json(['message' => 'Imagen eliminada correctamente.']);
    }
}
