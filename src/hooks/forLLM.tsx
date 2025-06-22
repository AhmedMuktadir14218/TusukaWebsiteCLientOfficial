The main problem is plant add successfully working in postman test. it retuns 
{
    "unit_id": "1",
    "plant_id": "tusuka-new-oven",
    "name": "Tusuka New Oven.",
    "short_description": "High-quality stone, enzyme & dyeing services at Konabari.",
    "images": [
        "http://localhost:8000/uploads/plants/0a5599d2-6ecf-418d-b1a2-cf89122132b8.jpg",
        "http://localhost:8000/uploads/plants/2bd13c31-b8d0-4037-8ce4-f7ab1d903a44.jpg"
    ],
    "details": {
        "employees": "54242",
        "wetCapacity": "80,000 pcs/day",
        "dryCapacity": "100,000 pcs/day",
        "space": "475,112 SFT"
    },
    "updated_at": "2025-06-18T11:29:02.000000Z",
    "created_at": "2025-06-18T11:29:02.000000Z",
    "id": 11
}

now the problem is data update not working backend and frontend. and in frontend side data not added.
so read all my code and find the bug then ecute the result in proper way 
2. 
 
D:\Xampp\htdocs\tusukaWebServer-4\routes\api.php
<?php

use App\Http\Controllers\Api\Auth\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\LogoutController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\ExplorePlantController;
use App\Http\Controllers\Api\JobController;

// Public routes (No token required for these)
Route::post('/register', [RegisterController::class, 'store']);
Route::post('/login', [LoginController::class, 'store']);


// Read Jobs (list & single)
Route::get('/readjobs', [JobController::class, 'index']); // List all
Route::get('/readjobs/{id}', [JobController::class, 'show']); // Single job


// If you were using Route::apiResource, you would move it here too,
// and remove the individual routes above it.
// Route::apiResource('jobs', JobController::class); // This would also be public
Route::apiResource('jobs', JobController::class);

Route::get('/explore-plants', [ExplorePlantController::class, 'index']);

// Header
    Route::post('/explore-plants/header', [ExplorePlantController::class, 'storeHeader']);
    
    // Units
    Route::post('/explore-plants/units', [ExplorePlantController::class, 'storeUnit']);
    
    
    // Plants
    Route::post('/explore-plants/plants', [ExplorePlantController::class, 'storePlant']);
    Route::post('/explore-plants/plants/{id}', [ExplorePlantController::class, 'updatePlant']);
    Route::delete('/explore-plants/plants/{id}', [ExplorePlantController::class, 'destroyPlant']);
    
    // Reordering
    Route::post('/explore-plants/reorder-units', [ExplorePlantController::class, 'reorderUnits']);
    Route::post('/explore-plants/reorder-plants', [ExplorePlantController::class, 'reorderPlants']);
Route::put('/explore-plants/units/{id}', [ExplorePlantController::class, 'updateUnit']); 
Route::delete('/explore-plants/units/{id}', [ExplorePlantController::class, 'destroyUnit']); // Add this

// Authenticated routes (still require a token)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [LogoutController::class, 'store']);
    // All Job routes will now be public (no token required)
Route::post('/createjobs', [JobController::class, 'store']);
// Update Job
Route::put('/putjobs/{id}', [JobController::class, 'update']);

// Delete Job
Route::delete('/dropjobs/{id}', [JobController::class, 'destroy']);



});
D:\Xampp\htdocs\tusukaWebServer-4\app\Http\Controllers\Api\ExplorePlantController.php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExploreHeader;
use App\Models\Plant;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ExplorePlantController extends Controller
{
    /**
     * Get all explore plant data
     */
    public function index()
    {
        $header = ExploreHeader::first();
        $units = Unit::with('plants')->orderBy('order')->get();

        return response()->json([
            'exploreHeader' => $header,
            'units' => $units
        ]);
    }

    /**
     * Store explore header data
     */


    public function storeHeader(Request $request)
{
    $validator = Validator::make($request->all(), [
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'cta_text' => 'required|string|max:255',
        'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $imageUrl = null;

    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $filename = Str::uuid() . '.' . $image->getClientOriginalExtension();

        $destinationPath = public_path('uploads/explore-header');
        $image->move($destinationPath, $filename);

        $imageUrl = url('uploads/explore-header/' . $filename);
    }

    $header = ExploreHeader::updateOrCreate(
        ['id' => 1],
        [
            'title' => $request->title,
            'description' => $request->description,
            'cta_text' => $request->cta_text,
            'image' => $imageUrl, // Store image URL
        ]
    );

    return response()->json($header, 201);
}

    /**
     * Store a new unit
     */


public function storeUnit(Request $request)
{
    $validator = Validator::make($request->all(), [
        'title' => 'required|string|max:255',
        'background_image' => 'nullable|file|image|mimes:jpg,jpeg,png,webp|max:10240', // 10MB
        'description' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $imageUrl = null;

    if ($request->hasFile('background_image')) {
        $image = $request->file('background_image');
        $filename = Str::uuid() . '.' . $image->getClientOriginalExtension();
        $destinationPath = public_path('uploads/units');
        
        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0777, true);
        }
        
        $image->move($destinationPath, $filename);
        $imageUrl = url('uploads/units/' . $filename);
    }

    $unit = Unit::create([
        'title' => $request->title,
        'background_image' => $imageUrl,
        'description' => $request->description,
    ]);

    return response()->json($unit, 201);
}

 

    /**
     * Store a new plant
     */


public function storePlant(Request $request)
{
    $validator = Validator::make($request->all(), [
        'unit_id' => 'required|exists:units,id',
        'plant_id' => 'required|string|unique:plants,plant_id',
        'name' => 'required|string|max:255',
        'short_description' => 'required|string',
        'images' => 'nullable|array',
        'images.*' => 'image|mimes:jpeg,jpg,png,webp|max:2048',
        'details' => 'nullable|array',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $imageUrls = [];

    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $image) {
            $filename = Str::uuid() . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path('uploads/plants');
            $image->move($destinationPath, $filename);

            $imageUrls[] = url('uploads/plants/' . $filename);
        }
    }

    $plant = Plant::create([
        'unit_id' => $request->unit_id,
        'plant_id' => $request->plant_id,
        'name' => $request->name,
        'short_description' => $request->short_description,
        'images' => $imageUrls,  // Stored as JSON
        'details' => $request->details,
    ]);

    return response()->json($plant, 201);
}

 
  public function updatePlant(Request $request, $id)
    {
        $plant = Plant::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'unit_id' => 'sometimes|exists:units,id',
            'plant_id' => 'sometimes|string|unique:plants,plant_id,' . $plant->id,
            'name' => 'sometimes|string|max:255',
            'short_description' => 'sometimes|string',
            'images' => 'sometimes|array',
            'details' => 'sometimes|array'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $plant->update($request->all());

        return response()->json($plant);
    }

    /**
     * Delete a plant
     */
    public function destroyPlant($id)
    {
        $plant = Plant::findOrFail($id);
        $plant->delete();

        return response()->json(['message' => 'Plant deleted successfully']);
    }

    /**
     * Reorder units
     */
    public function reorderUnits(Request $request)
    {
        $request->validate([
            'order' => 'required|array',
            'order.*' => 'exists:units,id'
        ]);

        foreach ($request->order as $index => $unitId) {
            Unit::where('id', $unitId)->update(['order' => $index]);
        }

        return response()->json(['message' => 'Units reordered successfully']);
    }

    /**
     * Reorder plants within a unit
     */
    public function reorderPlants(Request $request)
    {
        $request->validate([
            'unit_id' => 'required|exists:units,id',
            'order' => 'required|array',
            'order.*' => 'exists:plants,id'
        ]);

        foreach ($request->order as $index => $plantId) {
            Plant::where('id', $plantId)
                ->where('unit_id', $request->unit_id)
                ->update(['order' => $index]);
        }

        return response()->json(['message' => 'Plants reordered successfully']);
    }
    /**
 * Update a unit
 */

public function updateUnit(Request $request, $id)
{
    $unit = Unit::findOrFail($id);

    $validator = Validator::make($request->all(), [
        'title' => 'sometimes|string|max:255',
        'background_image' => 'nullable|file|image|mimes:jpg,jpeg,png,webp|max:10240',
        'description' => 'sometimes|string',
        'order' => 'sometimes|integer'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $data = [
        'title' => $request->title ?? $unit->title,
        'description' => $request->description ?? $unit->description,
        'order' => $request->order ?? $unit->order
    ];

    // Handle file upload
    if ($request->hasFile('background_image')) {
        $image = $request->file('background_image');
        $filename = Str::uuid() . '.' . $image->getClientOriginalExtension();
        $destinationPath = public_path('uploads/units');
        
        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0777, true);
        }
        
        $image->move($destinationPath, $filename);
        $data['background_image'] = url('uploads/units/' . $filename);
        
        // Delete old image if it exists
        if ($unit->background_image) {
            $oldImagePath = str_replace(url(''), '', $unit->background_image);
            $oldImagePath = public_path($oldImagePath);
            if (file_exists($oldImagePath)) {
                unlink($oldImagePath);
            }
        }
    } elseif ($request->has('background_image') && empty($request->background_image)) {
        // Handle image removal
        if ($unit->background_image) {
            $oldImagePath = str_replace(url(''), '', $unit->background_image);
            $oldImagePath = public_path($oldImagePath);
            if (file_exists($oldImagePath)) {
                unlink($oldImagePath);
            }
        }
        $data['background_image'] = null;
    }

    $unit->update($data);

    return response()->json($unit);
}

/**
 * Delete a unit
 */
public function destroyUnit($id)
{
    $unit = Unit::findOrFail($id);
    $unit->delete();

    return response()->json(['message' => 'Unit deleted successfully']);
}
}

D:\Xampp\htdocs\tusukaWebServer-4\resources\js\pages\ExplorePlants\ExplorePlants.tsx
 
import { useState, useEffect } from 'react';
import axios from 'axios';
import AppLayout from '@/layouts/app-layout';
import { ExploreHeader } from '@/components/ExplorePlantComponent/Admin/ExploreHeader';
import { UnitsTable } from '@/components/ExplorePlantComponent/Admin/UnitsTable';
import { PlantsTable } from '@/components/ExplorePlantComponent/Admin/PlantsTable';
import { Alert, Button, CircularProgress } from '@mui/material';
 
interface ExploreHeaderData {
  id: number;
  title: string;
  description: string;
  cta_text: string;
  image: string;
}

interface Plant {
  id: number;
  unit_id: number;
  plant_id: string;
  name: string;
  short_description: string;
  images: string[];
  details: Record<string, unknown>;
}

interface Unit {
  id: number;
  title: string;
  background_image: string;
  description: string;
  order: number;
  plants: Plant[];
}

interface ExplorePlantsData {
  exploreHeader: ExploreHeaderData;
  units: Unit[];
}

const ExplorePlants = () => {
  const [data, setData] = useState<ExplorePlantsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/explore-plants');
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleHeaderSave = async (header: Partial<ExploreHeaderData>) => {
  //   try {
  //     const response = await axios.post('/api/explore-plants/header', header);
  //     setData(prev => prev ? { ...prev, exploreHeader: response.data } : null);
  //     return true;
  //   } catch (err) {
  //     console.error('Failed to update header', err);
  //     throw err;
  //   }
  // };
const handleHeaderSave = async (header: Partial<ExploreHeaderData>) => {
  try {
    const formData = new FormData();
    
    // Append all text fields
    formData.append('title', header.title || '');
    formData.append('description', header.description || '');
    formData.append('cta_text', header.cta_text || '');
    
    // Handle file upload if it's a File object
    if (header.image instanceof File) {
      formData.append('image', header.image);
    } else if (typeof header.image === 'string') {
      // If it's a string (existing URL), send as is
      formData.append('image', header.image);
    }

    const response = await axios.post('/api/explore-plants/header', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    setData(prev => prev ? { ...prev, exploreHeader: response.data } : null);
    return true;
  } catch (err) {
    console.error('Failed to update header', err);
    throw err;
  }
};
const handleAddUnit = async (unitData: FormData): Promise<void> => {
  try {
    const response = await axios.post('/api/explore-plants/units', unitData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setData(prev => prev ? { 
      ...prev, 
      units: [...prev.units, { ...response.data, plants: [] }] 
    } : null);
  } catch (err) {
    console.error('Failed to add unit', err);
    throw err;
  }
};

const handleEditUnit = async (id: number, unitData: FormData): Promise<void> => {
  try {
    const response = await axios.post(`/api/explore-plants/units/${id}?_method=PUT`, unitData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        units: prev.units.map(u => u.id === id ? { ...u, ...response.data } : u)
      };
    });
  } catch (err) {
    console.error('Failed to update unit', err);
    throw err;
  }
};
  const handleDeleteUnit = async (id: number): Promise<void> => {
    try {
      await axios.delete(`/api/explore-plants/units/${id}`);
      setData(prev => {
        if (!prev) return null;
        return {
          ...prev,
          units: prev.units.filter(u => u.id !== id)
        };
      });
    } catch (err) {
      console.error('Failed to delete unit', err);
      throw err;
    }
  };

  const handleAddPlant = async (unitId: number, plant: Omit<Plant, 'id'>) => {
    try {
      const response = await axios.post('/api/explore-plants/plants', {
        ...plant,
        unit_id: unitId
      });
      setData(prev => {
        if (!prev) return null;
        return {
          ...prev,
          units: prev.units.map(u => 
            u.id === unitId 
              ? { ...u, plants: [...u.plants, response.data] } 
              : u
          )
        };
      });
      return true;
    } catch (err) {
      console.error('Failed to add plant', err);
      throw err;
    }
  };

  const handleEditPlant = async (unitId: number, plantId: number, plant: Partial<Plant>) => {
    try {
      const response = await axios.put(`/api/explore-plants/plants/${plantId}`, plant);
      setData(prev => {
        if (!prev) return null;
        return {
          ...prev,
          units: prev.units.map(u => ({
            ...u,
            plants: u.plants.map(p => 
              p.id === plantId ? { ...p, ...response.data } : p
            )
          }))
        };
      });
      return true;
    } catch (err) {
      console.error('Failed to update plant', err);
      throw err;
    }
  };

  const handleDeletePlant = async (unitId: number, plantId: number) => {
    try {
      await axios.delete(`/api/explore-plants/plants/${plantId}`);
      setData(prev => {
        if (!prev) return null;
        return {
          ...prev,
          units: prev.units.map(u => ({
            ...u,
            plants: u.plants.filter(p => p.id !== plantId)
          }))
        };
      });
      return true;
    } catch (err) {
      console.error('Failed to delete plant', err);
      throw err;
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="p-6">
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
          <Button 
            variant="contained" 
            onClick={fetchData}
          >
            Retry
          </Button>
        </div>
      </AppLayout>
    );
  }

  if (!data) {
    return (
      <AppLayout>
        <div className="p-6">
          <Alert severity="warning">No data available</Alert>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6">
        <ExploreHeader 
          header={data.exploreHeader} 
          onSave={handleHeaderSave} 
        />

        <UnitsTable
          units={data.units}
          onAdd={handleAddUnit}
          onEdit={handleEditUnit}
          onDelete={handleDeleteUnit}
        />

        {data.units.map(unit => (
          <div key={unit.id} className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{unit.title} Plants</h3>
            <PlantsTable
              unitId={unit.id}
              plants={unit.plants}
              onAdd={handleAddPlant}
              onEdit={handleEditPlant}
              onDelete={handleDeletePlant}
            />
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default ExplorePlants;

D:\Xampp\htdocs\tusukaWebServer-4\resources\js\components\ExplorePlantComponent\Admin\PlantsTable.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */


import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Close as CloseIcon } from '@mui/icons-material';

interface PlantsTableProps {
  unitId: number;
  plants: any[];
  onAdd: (unitId: number, plant: any) => void;
  onEdit: (unitId: number, plantId: number, plant: any) => void;
  onDelete: (unitId: number, plantId: number) => void;
}

export const PlantsTable = ({ unitId, plants, onAdd, onEdit, onDelete }: PlantsTableProps) => {
  const [open, setOpen] = useState(false);
  const [currentPlant, setCurrentPlant] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [newImage, setNewImage] = useState('');

  const handleOpenAdd = () => {
    setCurrentPlant({
      name: '',
      plant_id: '',
      short_description: '',
      details: {
        employees: 0,
        wetCapacity: '',
        dryCapacity: '',
        space: '',
        machines: 0,
        address: '',
        locationEmbed: ''
      }
    });
    setImages([]);
    setOpen(true);
  };

  const handleOpenEdit = (plant: any) => {
    setCurrentPlant(plant);
    setImages([...plant.images]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentPlant(null);
    setImages([]);
  };

  const handleSubmit = () => {
    const plantData = {
      ...currentPlant,
      images: [...images],
      unit_id: unitId
    };

    if (currentPlant.id) {
      onEdit(unitId, currentPlant.id, plantData);
    } else {
      onAdd(unitId, plantData);
    }
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('details.')) {
      const field = name.split('.')[1];
      setCurrentPlant({
        ...currentPlant,
        details: {
          ...currentPlant.details,
          [field]: value
        }
      });
    } else {
      setCurrentPlant({
        ...currentPlant,
        [name]: value
      });
    }
  };

  const handleAddImage = () => {
    if (newImage.trim()) {
      setImages([...images, newImage.trim()]);
      setNewImage('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Plants</h2>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd}>
          Add Plant
        </Button>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Plant ID</TableCell>
              <TableCell>Short Description</TableCell>
              <TableCell>Employees</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plants.map((plant) => (
              <TableRow key={plant.id}>
                <TableCell>{plant.name}</TableCell>
                <TableCell>{plant.plant_id}</TableCell>
                <TableCell>{plant.short_description}</TableCell>
                <TableCell>{plant.details.employees}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenEdit(plant)}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(unitId, plant.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{currentPlant?.id ? 'Edit Plant' : 'Add Plant'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} className="mt-2">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={currentPlant?.name || ''}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Plant ID"
                name="plant_id"
                value={currentPlant?.plant_id || ''}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Short Description"
                name="short_description"
                value={currentPlant?.short_description || ''}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
              />
            </Grid>

            {/* Images Section */}
            <Grid item xs={12}>
              <div className="mb-4">
                <h4 className="text-lg font-medium mb-2">Images</h4>
                <div className="flex gap-2 mb-2">
                  <TextField
                    fullWidth
                    label="Image URL"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    margin="none"
                    size="small"
                  />
                  <Button variant="contained" onClick={handleAddImage}>
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {images.map((img, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <img src={img} alt={`Preview ${index}`} className="w-16 h-16 object-cover" />
                      <span className="flex-1 truncate">{img}</span>
                      <IconButton onClick={() => handleRemoveImage(index)}>
                        <CloseIcon />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </div>
            </Grid>

            {/* Details Section */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Employees"
                name="details.employees"
                value={currentPlant?.details?.employees || 0}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Wet Capacity"
                name="details.wetCapacity"
                value={currentPlant?.details?.wetCapacity || ''}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Dry Capacity"
                name="details.dryCapacity"
                value={currentPlant?.details?.dryCapacity || ''}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Space"
                name="details.space"
                value={currentPlant?.details?.space || ''}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Machines"
                name="details.machines"
                value={currentPlant?.details?.machines || 0}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="details.address"
                value={currentPlant?.details?.address || ''}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location Embed URL"
                name="details.locationEmbed"
                value={currentPlant?.details?.locationEmbed || ''}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};