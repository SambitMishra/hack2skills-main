import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HotspotMap } from './HotspotMap';

// Mock google maps api to prevent loading actual script in tests
vi.mock('@react-google-maps/api', () => ({
  GoogleMap: ({ children, onDblClick }: any) => (
    <div data-testid="google-map" onDoubleClick={onDblClick}>
      {children}
    </div>
  ),
  useJsApiLoader: () => ({ isLoaded: true }),
  Marker: ({ position }: any) => (
    <div data-testid="map-marker" data-lat={position.lat} data-lng={position.lng} />
  )
}));

describe('HotspotMap Component', () => {
  const mockIncidents = [
    { id: '1', lat: 28.6139, lng: 77.209, aiScore: 0.9, timestamp: '2023-10-01' },
    { id: '2', lat: 19.076, lng: 72.8777, aiScore: 0.95, timestamp: '2023-10-02' }
  ];

  it('renders a map with markers for each incident', () => {
    render(<HotspotMap incidents={mockIncidents} onRegionDoubleClick={vi.fn()} apiKey="test-key" />);
    
    expect(screen.getByTestId('google-map')).toBeInTheDocument();
    
    const markers = screen.getAllByTestId('map-marker');
    expect(markers).toHaveLength(2);
    expect(markers[0]).toHaveAttribute('data-lat', '28.6139');
  });

  it('calls onRegionDoubleClick when the map is double-clicked', () => {
    const handleDblClick = vi.fn();
    render(<HotspotMap incidents={mockIncidents} onRegionDoubleClick={handleDblClick} apiKey="test-key" />);
    
    fireEvent.doubleClick(screen.getByTestId('google-map'));
    expect(handleDblClick).toHaveBeenCalled();
  });
});
