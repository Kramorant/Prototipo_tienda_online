<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@collectibles.com'],
            [
                'name'     => 'Admin',
                'password' => Hash::make('Admin1234!'),
                'role'     => 'admin',
            ]
        );
    }
}
