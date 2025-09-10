// // components/ExplorePlants/EditPlantModal.tsx
import React, { useState, useEffect } from 'react';
import PlantImageSlider from './PlantImageSlider';
import type { Plant } from '../../types/explorePlants';
import { Dialog, Transition } from '@headlessui/react'; 
import { Close as CloseIcon } from '@mui/icons-material'; 

interface PlantDetailsModalProps {
  plant: Plant;
  isOpen: boolean;
  onClose: () => void;
}

const PlantDetailsModal: React.FC<PlantDetailsModalProps> = ({ plant, isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderDetailValue = (value: any) => {
    if (typeof value === 'object' && value !== null) {
      return (
        <div className="space-y-1">
          {Object.entries(value).map(([key, val]) => (
            <div key={key}>
              <span className="font-medium">{key}:</span> {String(val)}
            </div>
          ))}
        </div>
      );
    }
    return value || 'N/A';
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  {/* Replaced XMarkIcon with Material-UI's CloseIcon */}
                  <CloseIcon className="h-6 w-6 text-gray-700" /> 
                </button>

                <div className="overflow-y-auto max-h-[90vh]">
                  <div className="p-6 md:p-8">
                    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-8`}>
                      <div className={`${isMobile ? 'w-full' : 'w-1/2'}`}>
                        <PlantImageSlider images={plant.images} title={plant.name} />
                      </div>

                      <div className={`${isMobile ? 'w-full' : 'w-1/2'} flex flex-col`}>
                        <Dialog.Title className="text-2xl md:text-3xl font-bold mb-6 text-[#363D44]">
                          {plant.name}
                        </Dialog.Title>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(plant.details).map(([key, value], index) => (
                            <div 
                              key={index}
                              className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
                            >
                              <h3 className="font-semibold text-gray-900 capitalize">{key}</h3>
                              <div className="text-gray-600 mt-2">
                                {renderDetailValue(value)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <h3 className="font-semibold text-gray-900">Description</h3>
                      <div className="text-gray-600 mt-4">
                        {plant.short_description}
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PlantDetailsModal;


