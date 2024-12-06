import React, { useEffect, useRef } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import AddMarkerControl from '../components/AddMarkerControl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Home = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    if (mapContainerRef.current) {
      const map = new Map({
        container: mapContainerRef.current,
        center: [-70.26, -33.34],
        pitch: 80,
        zoom: 14,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
      });

      map.addControl(new mapboxgl.GeolocateControl(), 'bottom-right');
      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
      map.addControl(new AddMarkerControl(), 'bottom-right');

      map.on('style.load', () => {
        map.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14,
        });
        map.setTerrain({ source: 'mapbox-dem' });
      });
      return () => map.remove();
    }
  }, []);

  return (
    <div
      style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}
      ref={mapContainerRef}
    ></div>
  );
};

export default Home;
