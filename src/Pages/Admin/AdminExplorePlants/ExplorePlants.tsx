import { PlantsTable } from '../../../Components/Admin/ExplorePlantComponent/Admin/PlantsTable';
import { UnitsTable } from '../../../Components/Admin/ExplorePlantComponent/Admin/UnitsTable';
import {ExploreHeader} from '../../../Components/Admin/ExplorePlantComponent/Admin/ExploreHeader';
import { Alert, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface ExploreHeaderData {
    id: number;
    title: string;
    description: string;
    cta_text: string;
    image: string;
}

interface PlantImage {
    id: number;
    plant_id: number;
    image_path: string;
    created_at?: string;
    updated_at?: string;
}

interface Plant {
    id: number;
    unit_id: number;
    plant_id: string;
    name: string;
    short_description: string;
    images: PlantImage[];
    details: Record<string, unknown>;
    order?: number;
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

    // const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    // const [currentPlantForImages, setCurrentPlantForImages] = useState<Plant | null>(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL }/api/explore-plants`);
            setData(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

      const fetchData2 = async () => {
    try {
      setLoading(true);
      const res = await axios.get<ExplorePlantsData>(`${API_BASE_URL }/api/explore-plants`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load explore plants data');
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
        fetchData2();
    }, []);
    useEffect(() => {
        fetchData();
    }, []);

    const handleHeaderSave = async (header: Partial<ExploreHeaderData>) => {
        try {
            const formData = new FormData();
            formData.append('title', header.title || '');
            formData.append('description', header.description || '');
            formData.append('cta_text', header.cta_text || '');
            if (header.image instanceof File) {
                formData.append('image', header.image);
            } else if (typeof header.image === 'string') {
                formData.append('image', header.image);
            }
            const response = await axios.post(`${API_BASE_URL}/api/explore-plants/header`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setData((prev) => (prev ? { ...prev, exploreHeader: response.data } : null));
            return true;
        } catch (err) {
            console.error('Failed to update header', err);
            throw err;
        }
    };


    if (loading) {
        return ( 
                <div className="flex h-64 items-center justify-center">
                    <CircularProgress />
                </div> 
        );
    }

    if (error) {
        return ( 
                <div className="p-6">
                    <Alert severity="error" className="mb-4">
                        {error}
                    </Alert>
                    <Button variant="contained" onClick={fetchData}>
                        Retry
                    </Button>
                </div> 
        );
    }

    if (!data) {
        return ( 
                <div className="p-6">
                    <Alert severity="warning">No data available</Alert>
                </div> 
        );
    }

    return ( 
            <div className="p-6">
                <ExploreHeader header={data.exploreHeader} onSave={handleHeaderSave} />
                 <UnitsTable
          units={data.units}
          onAdd={async (form) => {
            const resp = await axios.post(
              `${API_BASE_URL }/api/explore-plants/units`,
              form,
              { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            setData((d) =>
              d ? { ...d, units: [...d.units, { ...resp.data, plants: [] }] } : d
            );
          }}
          onEdit={async (id, form) => {
            form.append('_method', 'PUT');
            const resp = await axios.post(
              `${API_BASE_URL }/api/explore-plants/units/${id}`,
              form,
              { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            setData((d) =>
              d
                ? {
                    ...d,
                    units: d.units.map((u) =>
                      u.id === id ? { ...u, ...resp.data } : u
                    ),
                  }
                : d
            );
          }}
          onDelete={async (id) => {
            await axios.delete(`${API_BASE_URL }/api/explore-plants/units/${id}`);
            setData((d) => (d ? { ...d, units: d.units.filter((u) => u.id !== id) } : d));
          }}
        />

        {data.units.map((unit) => (
          <section key={unit.id} className="space-y-4">
            <h2 className="text-2xl font-semibold">{unit.title} Plants</h2>
            <PlantsTable
              unitId={unit.id}
              plants={unit.plants}
              refresh={fetchData}
            />
          </section>
        ))}
      </div> 
  );
};

export default ExplorePlants;

