// src/Components/Admin/About/AboutCompany.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs, Tab, Box } from '@mui/material';
import PrimaryStats from './PrimaryStats';
import SecondaryStats from './SecondaryStats';
import ProductionCapacityComponent from './ProductionCapacity';
import Units from './Units';
import BankingPartners from './BankingPartners';
import SisterConcerns from './SisterConcerns';

// Import all types from the centralized type definition file
import type {
  AboutCompanyData,
  PrimaryStat,
  SecondaryStat,
  Dataset,
  Metric,
  Unit,
  Plant, 
  SisterConcern,
} from '../../Admin/types/AboutCompanyType'; // Adjust path if needed

// Define BankingPartnerFormData type
interface BankingPartnerFormData extends FormData {
  name: string;
  image?: File;
}

const AboutCompany: React.FC = () => {
  const [data, setData] = useState<AboutCompanyData | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [aboutCompanyId, setAboutCompanyId] = useState<number>(1); // Assuming ID is 1 or fetch it
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<AboutCompanyData>(`${API_BASE_URL}/api/about-company`);
      setData(response.data);
      // Set the about company ID if available
      if (response.data?.id) {
        setAboutCompanyId(response.data.id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error, e.g., set data to a default empty state
      setData({
          id: 1, // Default ID
          main_title: 'Tusuka Group',
          highlighted_title: 'Group',
          primary_stats: [],
          secondary_stats: [],
          production_capacity: { id: 1, about_company_id: 1, title: '', datasets: [], metrics: [], created_at: '', updated_at: '' },
          units: [],
          banking_partners: [],
          sister_concerns: [],
          created_at: '',
          updated_at: '',
      });
    }
  };

  const handleDeletePrimaryStat = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/primary-stats/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting primary stat:', error);
    }
  };

  // Ensure the parameter type matches the expected input for a new stat
  const handleAddPrimaryStat = async (stat: Omit<PrimaryStat, 'id' | 'created_at' | 'updated_at' | 'about_company_id'>) => {
    try {
      await axios.post(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/primary-stats`, stat);
      fetchData();
    } catch (error) {
      console.error('Error adding primary stat:', error);
    }
  };

  const handleUpdatePrimaryStat = async (stat: PrimaryStat) => {
    try {
      await axios.put(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/primary-stats/${stat.id}`, stat);
      fetchData();
    } catch (error) {
      console.error('Error updating primary stat:', error);
    }
  };

  const handleDeleteSecondaryStat = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/secondary-stats/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting secondary stat:', error);
    }
  };

  const handleAddSecondaryStat = async (stat: Omit<SecondaryStat, 'id' | 'created_at' | 'updated_at' | 'about_company_id'>) => {
    try {
      await axios.post(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/secondary-stats`, stat);
      fetchData();
    } catch (error) {
      console.error('Error adding secondary stat:', error);
    }
  };

  const handleUpdateSecondaryStat = async (stat: SecondaryStat) => {
    try {
      await axios.put(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/secondary-stats/${stat.id}`, stat);
      fetchData();
    } catch (error) {
      console.error('Error updating secondary stat:', error);
    }
  };

  const handleDeleteDataset = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/production-capacity/datasets/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting dataset:', error);
    }
  };

  const handleAddDataset = async (dataset: Omit<Dataset, 'id' | 'created_at' | 'updated_at' | 'production_capacity_id'>) => {
    try {
      await axios.post(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/production-capacity/datasets`, {
        ...dataset,
        production_capacity_id: data?.production_capacity?.id // Ensure this ID is correct for your backend
      });
      fetchData();
    } catch (error) {
      console.error('Error adding dataset:', error);
    }
  };

  const handleUpdateDataset = async (dataset: Dataset) => {
    try {
      await axios.put(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/production-capacity/datasets/${dataset.id}`, dataset);
      fetchData();
    } catch (error) {
      console.error('Error updating dataset:', error);
    }
  };

  const handleDeleteMetric = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/production-capacity/metrics/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting metric:', error);
    }
  };

  const handleAddMetric = async (metric: Omit<Metric, 'id' | 'created_at' | 'updated_at' | 'production_capacity_id'>) => {
    try {
      await axios.post(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/production-capacity/metrics`, {
        ...metric,
        production_capacity_id: data?.production_capacity?.id // Ensure this ID is correct for your backend
      });
      fetchData();
    } catch (error) {
      console.error('Error adding metric:', error);
    }
  };

  const handleUpdateMetric = async (metric: Metric) => {
    try {
      await axios.put(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/production-capacity/metrics/${metric.id}`, metric);
      fetchData();
    } catch (error) {
      console.error('Error updating metric:', error);
    }
  };

  const handleDeleteUnit = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/units/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting unit:', error);
    }
  };

  const handleAddUnit = async (unit: Omit<Unit, 'id' | 'plants' | 'created_at' | 'updated_at' | 'about_company_id'>) => {
    try {
      await axios.post(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/units`, {
        ...unit,
        about_company_id: aboutCompanyId
      });
      fetchData();
    } catch (error) {
      console.error('Error adding unit:', error);
    }
  };

  const handleUpdateUnit = async (unit: Unit) => {
    try {
      await axios.put(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/units/${unit.id}`, unit);
      fetchData();
    } catch (error) {
      console.error('Error updating unit:', error);
    }
  };

  const handleDeletePlant = async (plantId: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/units/plants/${plantId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const handleAddPlant = async (unitId: number, plant: Omit<Plant, 'id' | 'created_at' | 'updated_at' | 'details'>) => {
    try {
      await axios.post(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/units/${unitId}/plants`, {
        ...plant,
        unit_id: unitId
      });
      fetchData();
    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };

  const handleUpdatePlant = async (plant: Plant) => {
    try {
      await axios.put(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/units/plants/${plant.id}`, plant);
      fetchData();
    } catch (error) {
      console.error('Error updating plant:', error);
    }
  };

  const handleDeleteBankingPartner = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/banking-partners/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting banking partner:', error);
    }
  };

  const handleAddBankingPartner = async (partner: BankingPartnerFormData) => {
    try {
      const formData = new FormData();
      formData.append('name', partner.name);
      if (partner.image) {
        formData.append('image', partner.image);
      }
      formData.append('about_company_id', aboutCompanyId.toString());

      await axios.post(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/banking-partners`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchData();
    } catch (error) {
      console.error('Error adding banking partner:', error);
    }
  };

  const handleUpdateBankingPartner = async (id: number, partner: BankingPartnerFormData) => {
    try {
      const formData = new FormData();
      formData.append('name', partner.name);
      if (partner.image) {
        formData.append('image', partner.image);
      }
      formData.append('_method', 'PUT'); // For Laravel to recognize as PUT request

      await axios.post(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/banking-partners/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchData();
    } catch (error) {
      console.error('Error updating banking partner:', error);
    }
  };

  const handleDeleteSisterConcern = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/sister-concerns/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting sister concern:', error);
    }
  };

  const handleAddSisterConcern = async (concern: Omit<SisterConcern, 'id' | 'created_at' | 'updated_at' | 'about_company_id'>) => {
    try {
      await axios.post(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/sister-concerns`, {
        ...concern,
        about_company_id: aboutCompanyId
      });
      fetchData();
    } catch (error) {
      console.error('Error adding sister concern:', error);
    }
  };

  const handleUpdateSisterConcern = async (concern: SisterConcern) => {
    try {
      await axios.put(`${API_BASE_URL}/api/about-company/${aboutCompanyId}/sister-concerns/${concern.id}`, concern);
      fetchData();
    } catch (error) {
      console.error('Error updating sister concern:', error);
    }
  };


  return (
    <div className="container mx-auto p-4">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
          <Tab label="Primary Stats" />
          <Tab label="Secondary Stats" />
          <Tab label="Production Capacity" />
          <Tab label="Units" />
          <Tab label="Banking Partners" />
          <Tab label="Sister Concerns" />
        </Tabs>
      </Box>

      {/* Only render components if data is not null */}
      {data ? (
        <div className="mt-4">
          {activeTab === 0 && (
            <PrimaryStats
              stats={data.primary_stats}
              onDelete={handleDeletePrimaryStat}
              onAdd={handleAddPrimaryStat}
              onUpdate={handleUpdatePrimaryStat}
            />
          )}
          {activeTab === 1 && (
            <SecondaryStats
              stats={data.secondary_stats}
              onDelete={handleDeleteSecondaryStat}
              onAdd={handleAddSecondaryStat}
              onUpdate={handleUpdateSecondaryStat}
            />
          )}

          {activeTab === 2 && data.production_capacity && (
            <ProductionCapacityComponent
              capacity={data.production_capacity}
              onUpdateDataset={handleUpdateDataset}
              onDeleteDataset={handleDeleteDataset}
              onAddDataset={handleAddDataset}
              onUpdateMetric={handleUpdateMetric}
              onDeleteMetric={handleDeleteMetric}
              onAddMetric={handleAddMetric}
            />
          )}

          {activeTab === 3 && (
            <Units
              units={data.units}
              onAddUnit={handleAddUnit}
              onUpdateUnit={handleUpdateUnit}
              onDeleteUnit={handleDeleteUnit}
              onAddPlant={handleAddPlant}
              onUpdatePlant={handleUpdatePlant}
              onDeletePlant={handleDeletePlant}
            />
          )}

          {activeTab === 4 && (
            <BankingPartners
              partners={data.banking_partners}
              onDelete={handleDeleteBankingPartner}
              onAdd={handleAddBankingPartner}
              onUpdate={handleUpdateBankingPartner}
            />
          )}

          {activeTab === 5 && (
            <SisterConcerns
              concerns={data.sister_concerns}
              onDelete={handleDeleteSisterConcern}
              onAdd={handleAddSisterConcern}
              onUpdate={handleUpdateSisterConcern}
            />
          )}
        </div>
      ) : (
        <div className="mt-4 text-center text-gray-500">Loading data or no data available...</div>
      )}
    </div>
  );
};

export default AboutCompany;