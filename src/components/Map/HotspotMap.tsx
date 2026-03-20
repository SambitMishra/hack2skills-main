import { useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

export interface MapIncidentData {
  id: string;
  lat: number;
  lng: number;
  aiScore: number;
  timestamp: string;
}

interface Props {
  incidents: MapIncidentData[];
  onRegionDoubleClick: (e?: any) => void;
  apiKey: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '0.75rem',
  overflow: 'hidden'
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629 // Centered on India based on product requirements
};

export function HotspotMap({ incidents, onRegionDoubleClick, apiKey }: Props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const markers = useMemo(() => incidents.map(incident => (
    <Marker 
      key={incident.id} 
      position={{ lat: incident.lat, lng: incident.lng }} 
      title={`AI Score: ${incident.aiScore}`}
    />
  )), [incidents]);

  if (!isLoaded) return <div className="h-[500px] w-full flex items-center justify-center bg-gray-100 rounded-xl animate-pulse">Loading Map...</div>;

  return (
    <div className="shadow-lg rounded-xl border border-gray-200" aria-label="Interactive incident map">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={5}
        onDblClick={onRegionDoubleClick}
        options={{ disableDoubleClickZoom: true }}
      >
        {markers}
      </GoogleMap>
    </div>
  );
}
