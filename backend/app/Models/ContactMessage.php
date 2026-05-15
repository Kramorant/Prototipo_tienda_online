<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'read',
        'read_at',
    ];

    protected $casts = [
        'read'    => 'boolean',
        'read_at' => 'datetime',
    ];
}