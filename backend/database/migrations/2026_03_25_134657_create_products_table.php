<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('sale_price', 10, 2)->nullable(); // Precio rebajado
            $table->integer('stock')->default(0);
            $table->string('sku')->unique()->nullable();      // Código de producto
            $table->string('main_image')->nullable();
            $table->enum('scale', ['1/4', '1/6', '1/7', '1/8', '1/10', '1/12', 'other'])->nullable();
            $table->enum('condition', ['new', 'used', 'pre-order'])->default('new');
            $table->date('release_date')->nullable();
            $table->boolean('featured')->default(false);      // Producto destacado
            $table->boolean('active')->default(true);
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('manufacturer_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('products');
    }
};