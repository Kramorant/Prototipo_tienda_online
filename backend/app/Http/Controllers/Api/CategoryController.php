<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::where('active', true)->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'slug'        => 'required|string|unique:categories',
            'description' => 'nullable|string',
            'image'       => 'nullable|string',
            'active'      => 'boolean',
        ]);

        $category = Category::create($request->all());

        return response()->json($category, 201);
    }

    public function show(Category $category)
    {
        return response()->json($category->load('products'));
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name'        => 'sometimes|string|max:255',
            'slug'        => 'sometimes|string|unique:categories,slug,' . $category->id,
            'description' => 'nullable|string',
            'image'       => 'nullable|string',
            'active'      => 'boolean',
        ]);

        $category->update($request->all());

        return response()->json($category);
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(['message' => 'Categoría eliminada correctamente.']);
    }
}