<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::with('items')
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $request->validate([
            'items'            => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
            'shipping_name'    => 'required|string',
            'shipping_email'   => 'required|email',
            'shipping_address' => 'required|string',
            'shipping_city'    => 'required|string',
            'shipping_country' => 'required|string',
            'shipping_zip'     => 'required|string',
        ]);

        // Calcular totales
        $subtotal = 0;
        $items    = [];

        foreach ($request->items as $item) {
            $product  = Product::findOrFail($item['product_id']);
            $price    = $product->sale_price ?? $product->price;
            $itemSubtotal = $price * $item['quantity'];
            $subtotal += $itemSubtotal;

            $items[] = [
                'product_id'   => $product->id,
                'product_name' => $product->name,
                'price'        => $price,
                'quantity'     => $item['quantity'],
                'subtotal'     => $itemSubtotal,
            ];
        }

        $shippingCost = $subtotal >= 100 ? 0 : 5.99; // Envío gratis desde 100€
        $total        = $subtotal + $shippingCost;

        $order = Order::create([
            'user_id'          => $request->user()?->id,
            'order_number'     => 'ORD-' . strtoupper(Str::random(8)),
            'status'           => 'pending',
            'subtotal'         => $subtotal,
            'shipping_cost'    => $shippingCost,
            'total'            => $total,
            'payment_method'   => $request->payment_method,
            'shipping_name'    => $request->shipping_name,
            'shipping_email'   => $request->shipping_email,
            'shipping_phone'   => $request->shipping_phone,
            'shipping_address' => $request->shipping_address,
            'shipping_city'    => $request->shipping_city,
            'shipping_country' => $request->shipping_country,
            'shipping_zip'     => $request->shipping_zip,
            'notes'            => $request->notes,
        ]);

        $order->items()->createMany($items);

        return response()->json($order->load('items'), 201);
    }

    public function show(Request $request, Order $order)
    {
        if ($order->user_id !== $request->user()->id) {
            return response()->json(['message' => 'No autorizado.'], 403);
        }

        return response()->json($order->load('items'));
    }

    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $order->update(['status' => $request->status]);

        return response()->json($order);
    }

    public function destroy(Order $order)
    {
        $order->delete();

        return response()->json(['message' => 'Pedido eliminado correctamente.']);
    }
}