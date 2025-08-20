import React, { useEffect, useState } from 'react';

interface TabContent {
  id: number;
  tab_id: string;
  title: string;
  content: string;
  image_url: string;
  order: number;
  created_at: string;
  updated_at: string;
}

const MVC_Component: React.FC<{ initialTab?: string }> = ({ initialTab = 'mission' }) => {
  // Map URL parameters to your tab_ids
  const tabMapping: Record<string, string> = {
    mission: 'fabric-dyeing',
    vision: 'digital-printing',
    commitment: 'fabric-treated'
  };

  // Determine the initial active tab
  const getInitialTab = () => {
    return tabMapping[initialTab] || 'fabric-dyeing';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [tabContents, setTabContents] = useState<TabContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Function to transform the image URL
  const transformImageUrl = (url: string) => {
    if (url) {
      // Find the index of "/upload/"
      const uploadIndex = url.indexOf('/upload/');
      if (uploadIndex !== -1) {
        // Insert "/public" before "/upload/"
        return url.substring(0, uploadIndex) + '/public' + url.substring(uploadIndex);
      }
    }
    return url; // Return original URL if "/upload/" is not found or URL is empty
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/about-mvc`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data.success && data.data) {
          // Transform image_url for each item in data.data
          const transformedData = data.data.map((item: TabContent) => ({
            ...item,
            image_url: transformImageUrl(item.image_url)
          }));
          setTabContents(transformedData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update active tab when initialTab prop changes
  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [initialTab]);

  // Fallback content if API doesn't return data
  const fallbackContents = [
    {
      id: 1,
      tab_id: 'fabric-dyeing',
      title: 'Mission',
      content: 'To Manufacture & Supply superior Quality Garments with value added performance to our customer and dedicated to professional sales force with technical support & continues improvements for the sustainability of our business for long term.',
      image_url: '', // Add fallback image if needed
      order: 1,
      created_at: '',
      updated_at: ''
    },
    {
      id: 2,
      tab_id: 'digital-printing',
      title: 'Vision',
      content: 'Tusuka aims to produce sustainable superior quality products for our valued customers and ensures customers satisfaction and maintaining safe working place by ethical & environmental sustainability practice.',
      image_url: '', // Add fallback image if needed
      order: 2,
      created_at: '',
      updated_at: ''
    },
    {
      id: 3,
      tab_id: 'fabric-treated',
      title: 'Commitment',
      content: 'We are committed to ethical business practice, on-time production with quality products, merchandising, and shipment, and compliance according to the country law to ensure a safe working place.',
      image_url: '', // Add fallback image if needed
      order: 3,
      created_at: '',
      updated_at: ''
    }
  ];

  const displayContents = tabContents.length > 0 ? tabContents : fallbackContents;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased bg-gray-50">


      {/* Main Content Section - Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Tab Navigation */}
          <div className="flex flex-col md:flex-row justify-around items-center p-4 bg-gray-50 border-b border-gray-200 rounded-t-2xl">
            {displayContents.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.tab_id)}
                className={`
                  relative flex-1 text-center py-3 md:py-4 px-2 md:px-4 text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out
                  ${
                    activeTab === tab.tab_id
                      ? 'text-blue-700'
                      : 'text-gray-600 hover:text-blue-700'
                  }
                  focus:outline-none group
                `}
              >
                {tab.title}
                <span className={`
                  absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-blue-700 rounded-full transition-all duration-300 ease-in-out
                  ${activeTab === tab.tab_id ? 'w-full scale-x-100' : 'w-0 scale-x-0 group-hover:w-1/2'}
                `}></span>
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div className="p-6 md:p-10 lg:p-12">
            {displayContents.map((tab) => (
              <div
                key={tab.id}
                className={`transition-opacity duration-500 ease-in-out ${
                  activeTab === tab.tab_id ? 'opacity-100 block' : 'opacity-0 hidden'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  {tab.image_url && (
                    <div className="md:w-1/2 lg:w-2/5 flex-shrink-0">
                      <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-xl border border-gray-200">
                        <img
                          src={tab.image_url} // This will now use the transformed URL
                          alt={tab.title}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                  )}
                  <div className="md:w-1/2 lg:w-3/5 text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                      {tab.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      {tab.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MVC_Component;