<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'manufacturer', 'tags'])
            ->where('active', true);

        // Filtros
        if ($request->has('category')) {
            $query->whereHas('category', fn($q) => $q->where('slug', $request->category));
        }
        if ($request->has('manufacturer')) {
            $query->whereHas('manufacturer', fn($q) => $q->where('slug', $request->manufacturer));
        }
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }
        if ($request->has('featured')) {
            $query->where('featured', true);
        }
        if ($request->has('condition')) {
            $query->where('condition', $request->condition);
        }

        // Ordenación
        $sortBy    = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        return response()->json($query->paginate(12));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'            => 'required|string|max:255',
            'slug'            => 'required|string|unique:products',
            'price'           => 'required|numeric|min:0',
            'stock'           => 'integer|min:0',
            'category_id'     => 'nullable|exists:categories,id',
            'manufacturer_id' => 'nullable|exists:manufacturers,id',
        ]);

        $product = Product::create($request->all());

        if ($request->has('tags')) {
            $product->tags()->sync($request->tags);
        }

        return response()->json($product->load(['category', 'manufacturer', 'tags']), 201);
    }

    public function show(Product $product)
    {
        return response()->json(
            $product->load(['category', 'manufacturer', 'tags', 'images'])
        );
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name'            => 'sometimes|string|max:255',
            'slug'            => 'sometimes|string|unique:products,slug,' . $product->id,
            'price'           => 'sometimes|numeric|min:0',
            'stock'           => 'integer|min:0',
            'category_id'     => 'nullable|exists:categories,id',
            'manufacturer_id' => 'nullable|exists:manufacturers,id',
        ]);

        $product->update($request->all());

        if ($request->has('tags')) {
            $product->tags()->sync($request->tags);
        }

        return response()->json($product->load(['category', 'manufacturer', 'tags', 'images']));
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['message' => 'Producto eliminado correctamente.']);
    }
}