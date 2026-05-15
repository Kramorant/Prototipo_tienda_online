<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ManufacturerController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductImageController;

// ─── Rutas públicas ───────────────────────────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Productos (lectura pública)
Route::get('/products',        [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

// Categorías (lectura pública)
Route::get('/categories',             [CategoryController::class, 'index']);
Route::get('/categories/{category}',  [CategoryController::class, 'show']);

// Fabricantes (lectura pública)
Route::get('/manufacturers',                [ManufacturerController::class, 'index']);
Route::get('/manufacturers/{manufacturer}', [ManufacturerController::class, 'show']);

// Tags (lectura pública)
Route::get('/tags',       [TagController::class, 'index']);
Route::get('/tags/{tag}', [TagController::class, 'show']);

// Blog (lectura pública)
Route::get('/posts',        [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);

// Contacto (público)
Route::post('/contact', [ContactMessageController::class, 'store']);

// ─── Rutas privadas (requieren autenticación) ─────────────────
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // Pedidos (usuario autenticado)
    Route::get('/orders',          [OrderController::class, 'index']);
    Route::post('/orders',         [OrderController::class, 'store']);
    Route::get('/orders/{order}',  [OrderController::class, 'show']);

    // ─── Rutas de administrador ───────────────────────────────
    Route::prefix('admin')->middleware('admin')->group(function () {

        // Estadísticas y pedidos (admin)
        Route::get('/stats',  [AdminController::class, 'stats']);
        Route::get('/orders', [AdminController::class, 'allOrders']);

        // Usuarios
        Route::get('/users',                   [UserController::class, 'index']);
        Route::put('/users/{user}/role',        [UserController::class, 'updateRole']);

        // Imágenes de producto
        Route::post('/products/{product}/images',               [ProductImageController::class, 'store']);
        Route::delete('/products/{product}/images/{image}',     [ProductImageController::class, 'destroy']);

        // Productos
        Route::post('/products',              [ProductController::class, 'store']);
        Route::put('/products/{product}',     [ProductController::class, 'update']);
        Route::delete('/products/{product}',  [ProductController::class, 'destroy']);

        // Categorías
        Route::post('/categories',             [CategoryController::class, 'store']);
        Route::put('/categories/{category}',   [CategoryController::class, 'update']);
        Route::delete('/categories/{category}',[CategoryController::class, 'destroy']);

        // Fabricantes
        Route::post('/manufacturers',                [ManufacturerController::class, 'store']);
        Route::put('/manufacturers/{manufacturer}',  [ManufacturerController::class, 'update']);
        Route::delete('/manufacturers/{manufacturer}',[ManufacturerController::class, 'destroy']);

        // Tags
        Route::post('/tags',          [TagController::class, 'store']);
        Route::put('/tags/{tag}',     [TagController::class, 'update']);
        Route::delete('/tags/{tag}',  [TagController::class, 'destroy']);

        // Blog
        Route::post('/posts',         [PostController::class, 'store']);
        Route::put('/posts/{post}',   [PostController::class, 'update']);
        Route::delete('/posts/{post}',[PostController::class, 'destroy']);

        // Pedidos (admin)
        Route::put('/orders/{order}',    [OrderController::class, 'update']);
        Route::delete('/orders/{order}', [OrderController::class, 'destroy']);

        // Mensajes de contacto
        Route::get('/contact',                          [ContactMessageController::class, 'index']);
        Route::patch('/contact/{contactMessage}/read',  [ContactMessageController::class, 'markAsRead']);
    });
});