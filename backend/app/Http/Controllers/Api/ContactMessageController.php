<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $message = ContactMessage::create($request->all());

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