<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('author')
            ->where('published', true)
            ->orderBy('published_at', 'desc')
            ->paginate(9);

        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'slug'        => 'required|string|unique:posts',
            'content'     => 'required|string',
            'excerpt'     => 'nullable|string',
            'cover_image' => 'nullable|string',
            'published'   => 'boolean',
        ]);

        $post = Post::create([
            ...$request->all(),
            'user_id'      => $request->user()->id,
            'published_at' => $request->published ? now() : null,
        ]);

        return response()->json($post->load('author'), 201);
    }

    public function show(Post $post)
    {
        return response()->json($post->load('author'));
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title'       => 'sometimes|string|max:255',
            'slug'        => 'sometimes|string|unique:posts,slug,' . $post->id,
            'content'     => 'sometimes|string',
            'excerpt'     => 'nullable|string',
            'cover_image' => 'nullable|string',
            'published'   => 'boolean',
        ]);

        if ($request->has('published') && $request->published && !$post->published_at) {
            $post->published_at = now();
        }

        $post->update($request->all());

        return response()->json($post->load('author'));
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json(['message' => 'Post eliminado correctamente.']);
    }
}