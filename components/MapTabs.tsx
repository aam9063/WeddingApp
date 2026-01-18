'use client';
import React, { useState } from 'react';
import GoogleMapComponent from './GoogleMap';
import GoogleMapRouteComponent from './GoogleMapRoute';
import Image from 'next/image';
import { useLocale, useTranslations } from "next-intl";

type Tab = 'wedding' | 'party';

const MapTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('wedding');

  const t = useTranslations('IndexPage');
  const locale = useLocale();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'wedding':
        return (
          <div className="tab-content flex flex-col items-center">
            {/* Event Details */}
            <div className="event-details text-center mb-6 px-4">
              <h3 className="text-2xl font-semibold mb-2 text-[#545748]">
                {t('events.wedding.title')}
              </h3>
              <p className="text-lg font-medium text-gray-800 mb-1">
                🕐 {t('events.wedding.time')}
              </p>
              <p className="text-base text-gray-700 mb-1">
                📍 {t('events.wedding.location')}
              </p>
              <p className="text-sm text-gray-600">
                {t('events.wedding.address')}
              </p>
            </div>
            
            {/* Map and Image */}
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div className="map-container w-[400px] h-[400px]">
                <GoogleMapComponent />
              </div>
              <div className="image-container ml-0 mt-5 md:mt-0 md:ml-5 w-[400px] h-[400px]">
                <Image src="/iglesia.jpg" alt="Iglesia" width={400} height={400} className="object-cover rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        );
      case 'party':
        return (
          <div className="tab-content flex flex-col items-center">
            {/* Event Details */}
            <div className="event-details text-center mb-6 px-4">
              <h3 className="text-2xl font-semibold mb-2 text-[#545748]">
                {t('events.party.title')}
              </h3>
              <p className="text-lg font-medium text-gray-800 mb-1">
                🕐 {t('events.party.time')}
              </p>
              <p className="text-base text-gray-700 mb-1">
                📍 {t('events.party.location')}
              </p>
              <p className="text-sm text-gray-600">
                {t('events.party.address')}
              </p>
            </div>
            
            {/* Map and Image */}
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div className="map-container w-[400px] h-[400px]">
                <GoogleMapRouteComponent />
              </div>
              <div className="image-container ml-0 mt-5 md:mt-0 md:ml-5 w-[400px] h-[400px]">
                <Image src="/torredereixes.jpg" alt="Torre de Reixes" width={400} height={400} className="object-cover rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tabs-container w-full text-center my-5">
      <div className="tabs flex justify-center mb-5">
        <button
          className={`tab px-5 py-2 mx-2 border-2 cursor-pointer transition-colors duration-300 rounded-lg ${activeTab === 'wedding' ? 'bg-[#A0A48E] text-white' : 'bg-white text-[#545748]'}`}
          onClick={() => setActiveTab('wedding')}
        >
          {t('sections.Wedding')}
        </button>
        <button
          className={`tab px-5 py-2 mx-2 border-2 cursor-pointer transition-colors duration-300 rounded-lg ${activeTab === 'party' ? 'bg-[#A0A48E] text-white' : 'bg-white text-[#545748]'}`}
          onClick={() => setActiveTab('party')}
        >
          {t('sections.Party')}
        </button>
      </div>
      {renderTabContent()}
    </div>
  );
};

export default MapTabs;