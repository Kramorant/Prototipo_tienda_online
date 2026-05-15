<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Manufacturer;
use Illuminate\Http\Request;

class ManufacturerController extends Controller
{
    public function index()
    {
        return response()->json(Manufacturer::where('active', true)->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'slug'        => 'required|string|unique:manufacturers',
            'country'     => 'nullable|string',
            'description' => 'nullable|string',
            'logo'        => 'nullable|string',
            'website'     => 'nullable|url',
            'active'      => 'boolean',
        ]);

        $manufacturer = Manufacturer::create($request->all());

        return response()->json($manufacturer, 201);
    }

    public function show(Manufacturer $manufacturer)
    {
        return response()->json($manufacturer->load('products'));
    }

    public function update(Request $request, Manufacturer $manufacturer)
    {
        $request->validate([
            'name'        => 'sometimes|string|max:255',
            'slug'        => 'sometimes|string|unique:manufacturers,slug,' . $manufacturer->id,
            'country'     => 'nullable|string',
            'description' => 'nullable|string',
            'logo'        => 'nullable|string',
            'website'     => 'nullable|url',
            'active'      => 'boolean',
        ]);

        $manufacturer->update($request->all());

        return response()->json($manufacturer);
    }

    public function destroy(Manufacturer $manufacturer)
    {
        $manufacturer->delete();

        return response()->json(['message' => 'Fabricante eliminado correctamente.']);
    }
}