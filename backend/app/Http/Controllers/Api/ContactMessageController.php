<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:100',
            'email'   => 'required|email|max:150',
            'subject' => 'nullable|string|max:150',
            'message' => 'required|string|max:2000',
        ]);

        ContactMessage::create($validated);

        return response()->json([
            'message' => '¡Mensaje enviado correctamente!'
        ], 201);
    }

    public function index()
    {
        return response()->json(
            ContactMessage::orderBy('created_at', 'desc')->get()
        );
    }

    public function markAsRead(ContactMessage $contactMessage)
    {
        $contactMessage->update([
            'read'    => true,
            'read_at' => now(),
        ]);

        return response()->json($contactMessage);
    }
}