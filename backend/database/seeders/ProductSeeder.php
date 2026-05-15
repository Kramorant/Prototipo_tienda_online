<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'name'           => 'Figura Iron Man Mark 50',
                'slug'           => 'figura-iron-man-mark-50',
                'description'    => 'Figura articulada de Iron Man a escala 1:6',
                'price'          => 129.99,
                'sale_price'     => null,
                'stock'          => 10,
                'sku'            => 'FIG-001',
                'main_image'     => null,
                'scale'          => '1/6',
                'condition'      => 'new',
                'release_date'   => '2024-01-15',
                'featured'       => true,
                'active'         => true,
                'category_id'    => 1,
                'manufacturer_id'=> null,
                'created_at'     => now(),
                'updated_at'     => now()
            ],
            [
                'name'           => 'Spider-Man Statue Premium',
                'slug'           => 'spider-man-statue-premium',
                'description'    => 'Estatua de resina de Spider-Man edición limitada',
                'price'          => 249.99,
                'sale_price'     => 199.99,
                'stock'          => 5,
                'sku'            => 'EST-001',
                'main_image'     => null,
                'scale'          => '1/4',
                'condition'      => 'new',
                'release_date'   => '2024-03-20',
                'featured'       => true,
                'active'         => true,
                'category_id'    => 4,
                'manufacturer_id'=> null,
                'created_at'     => now(),
                'updated_at'     => now()
            ],
            [
                'name'           => 'Carta Pokémon Charizard Holo',
                'slug'           => 'carta-pokemon-charizard-holo',
                'description'    => 'Carta holográfica de Charizard primera edición',
                'price'          => 399.99,
                'sale_price'     => null,
                'stock'          => 3,
                'sku'            => 'CAR-001',
                'main_image'     => null,
                'scale'          => null,
                'condition'      => 'used',
                'release_date'   => '1999-01-01',
                'featured'       => true,
                'active'         => true,
                'category_id'    => 3,
                'manufacturer_id'=> null,
                'created_at'     => now(),
                'updated_at'     => now()
            ],
            [
                'name'           => 'Batman Cómic #1 1940',
                'slug'           => 'batman-comic-1-1940',
                'description'    => 'Réplica del primer cómic de Batman',
                'price'          => 89.99,
                'sale_price'     => null,
                'stock'          => 8,
                'sku'            => 'COM-001',
                'main_image'     => null,
                'scale'          => null,
                'condition'      => 'used',
                'release_date'   => '1940-03-30',
                'featured'       => false,
                'active'         => true,
                'category_id'    => 2,
                'manufacturer_id'=> null,
                'created_at'     => now(),
                'updated_at'     => now()
            ],
            [
                'name'           => 'Figura Goku Ultra Instinct',
                'slug'           => 'figura-goku-ultra-instinct',
                'description'    => 'Figura de Dragon Ball Super Ultra Instinct',
                'price'          => 79.99,
                'sale_price'     => 69.99,
                'stock'          => 15,
                'sku'            => 'FIG-002',
                'main_image'     => null,
                'scale'          => '1/8',
                'condition'      => 'new',
                'release_date'   => '2023-11-10',
                'featured'       => true,
                'active'         => true,
                'category_id'    => 1,
                'manufacturer_id'=> null,
                'created_at'     => now(),
                'updated_at'     => now()
            ],
            [
                'name'           => 'Carta Magic Black Lotus',
                'slug'           => 'carta-magic-black-lotus',
                'description'    => 'Réplica de la carta más icónica de Magic',
                'price'          => 199.99,
                'sale_price'     => null,
                'stock'          => 2,
                'sku'            => 'CAR-002',
                'main_image'     => null,
                'scale'          => null,
                'condition'      => 'used',
                'release_date'   => '1993-08-05',
                'featured'       => false,
                'active'         => true,
                'category_id'    => 3,
                'manufacturer_id'=> null,
                'created_at'     => now(),
                'updated_at'     => now()
            ],
        ]);
    }
}