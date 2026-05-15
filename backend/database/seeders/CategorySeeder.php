<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categories')->insert([
            ['name' => 'Figuras',  'slug' => 'figuras',  'description' => 'Figuras de colección',  'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Cómics',   'slug' => 'comics',   'description' => 'Cómics y manga',         'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Cartas',   'slug' => 'cartas',   'description' => 'Cartas coleccionables',  'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Estatuas', 'slug' => 'estatuas', 'description' => 'Estatuas y bustos',      'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}