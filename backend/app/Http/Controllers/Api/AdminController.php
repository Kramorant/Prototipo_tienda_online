<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;

class AdminController extends Controller
{
    public function stats()
    {
        return response()->json([
            'total_products' => Product::count(),
            'total_orders'   => Order::count(),
            'total_users'    => User::count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'total_revenue'  => (float) Order::where('status', '!=', 'cancelled')->sum('total'),
        ]);
    }

    public function allOrders()
    {
        $orders = Order::with(['user', 'items'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($orders);
    }
}
