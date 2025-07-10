import { useState, useEffect, useRef } from 'react';
import { supabase } from '../services/supabase';
import mapboxgl from 'mapbox-gl';
import { Box, Typography } from '@mui/material';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function Routes() {
  const [routes, setRoutes] = useState([]);
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    fetchRoutes();
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-99.13, 19.43], // Coordenadas iniciales (Ciudad de México)
      zoom: 12,
    });

    return () => map.current.remove();
  }, []);

  const fetchRoutes = async () => {
    const { data, error } = await supabase
      .from('ruta')
      .select(`
        *,
        ruta_cliente (
          *,
          cliente (nombre, coordenadas)
        )
      `);
    if (error) {
      console.error('Error fetching routes:', error);
    } else {
      setRoutes(data);
      addMarkers(data);
    }
  };

  const addMarkers = (routes) => {
    routes.forEach((route) => {
      route.ruta_cliente.forEach((rc) => {
        if (rc.cliente.coordenadas) {
          new mapboxgl.Marker()
            .setLngLat([
              rc.cliente.coordenadas.coordinates[0],
              rc.cliente.coordenadas.coordinates[1],
            ])
            .setPopup(new mapboxgl.Popup().setText(rc.cliente.nombre))
            .addTo(map.current);
        }
      });
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Rutas de Cobradores
      </Typography>
      <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
    </Box>
  );
}

export default Routes;