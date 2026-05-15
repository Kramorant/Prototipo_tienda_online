<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        return response()->json(Tag::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:tags',
        ]);

        $tag = Tag::create($request->all());

        return response()->json($tag, 201);
    }

    public function show(Tag $tag)
    {
        return response()->json($tag->load('products'));
    }

    public function update(Request $request, Tag $tag)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|unique:tags,slug,' . $tag->id,
        ]);

        $tag->update($request->all());

        return response()->json($tag);
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();

        return response()->json(['message' => 'Tag eliminado correctamente.']);
    }
}