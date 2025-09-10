import React, { useState, useEffect } from 'react'; 
import type { LabData } from '../../../Components/Admin/types/labTypes';
import HeaderSection from '../../../Components/Admin/LabComponents/HeaderSection';
import IntroSection from '../../../Components/Admin/LabComponents/IntroSection';
import ImageUploader from '../../../Components/Admin/LabComponents/ImageUploader';
import ServicesSection from '../../../Components/Admin/LabComponents/ServicesSection';
import FacilitiesSection from '../../../Components/Admin/LabComponents/FacilitiesSection';
import CertificationsSection from '../../../Components/Admin/LabComponents/CertificationsSection';


const Laboratory: React.FC = () => {
  const [labData, setLabData] = useState<LabData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchLabData();
  }, []);
// Create a proper service file
const LabService = {
  getLabData: async (): Promise<LabData> => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tusuka-lab`);
    if (!response.ok) throw new Error('Failed to fetch lab data');
    return response.json();
  },
  // Add other methods for update, delete, etc.
};

  const fetchLabData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await LabService.getLabData();
      setLabData(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

 

  const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'string') return error;
    if (error instanceof Error) return error.message;
    if (typeof error === 'object' && error !== null) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return axiosError?.response?.data?.message || 'An unknown error occurred';
    }
    return 'An unknown error occurred';
  };

  if (loading) return (
    
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#363D44]"></div>
      </div>
    
  );

  if (error) return (
    
      <div className="text-red-500 text-center py-8">
        {error}
        <button onClick={fetchLabData} className="ml-4 px-4 py-2 bg[#F0F1DF] text-white rounded hover:bg[#F0F1DF]">
          Retry
        </button>
      </div>
    
  );

  if (!labData) return (
    <>
      <div className="text-center py-8">No data available</div>
    </>
  );

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {saveLoading && (
          <div className="fixed top-0 left-0 right-0 bg[#F0F1DF] text-white p-2 text-center z-50">
            Saving changes...
          </div>
        )}

        <HeaderSection/>
        <IntroSection/>
        <ImageUploader />
        <ServicesSection/>
        <FacilitiesSection/>
        <CertificationsSection/>
      </div>
    </>
  );
};

export default Laboratory;

