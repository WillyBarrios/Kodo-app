import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

function SaleForm({ onSaleAdded }) {
  const [idCliente, setIdCliente] = useState('');
  const [tipoPago, setTipoPago] = useState('contado');
  const [idPlanPago, setIdPlanPago] = useState('');
  const [total, setTotal] = useState('');
  const [clientes, setClientes] = useState([]);
  const [planesPago, setPlanesPago] = useState([]);

  useEffect(() => {
    fetchClientes();
    fetchPlanesPago();
  }, []);

  const fetchClientes = async () => {
    const { data, error } = await supabase.from('cliente').select('id_cliente, nombre');
    if (error) {
      console.error('Error fetching clients:', error);
    } else {
      setClientes(data);
    }
  };

  const fetchPlanesPago = async () => {
    const { data, error } = await supabase.from('plan_pago').select('id_plan_pago, nombre');
    if (error) {
      console.error('Error fetching payment plans:', error);
    } else {
      setPlanesPago(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('venta').insert([
      {
        id_cliente: parseInt(idCliente),
        tipo_pago: tipoPago,
        id_plan_pago: tipoPago === 'credito' ? parseInt(idPlanPago) : null,
        total: parseFloat(total),
        estado: 'pendiente',
      },
    ]);
    if (error) {
      console.error('Error adding sale:', error);
    } else {
      onSaleAdded();
      setIdCliente('');
      setTipoPago('contado');
      setIdPlanPago('');
      setTotal('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Cliente</InputLabel>
        <Select
          value={idCliente}
          onChange={(e) => setIdCliente(e.target.value)}
          label="Cliente"
        >
          {clientes.map((cliente) => (
            <MenuItem key={cliente.id_cliente} value={cliente.id_cliente}>
              {cliente.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Tipo de Pago</InputLabel>
        <Select
          value={tipoPago}
          onChange={(e) => setTipoPago(e.target.value)}
          label="Tipo de Pago"
        >
          <MenuItem value="contado">Contado</MenuItem>
          <MenuItem value="credito">Crédito</MenuItem>
        </Select>
      </FormControl>
      {tipoPago === 'credito' && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Plan de Pago</InputLabel>
          <Select
            value={idPlanPago}
            onChange={(e) => setIdPlanPago(e.target.value)}
            label="Plan de Pago"
          >
            {planesPago.map((plan) => (
              <MenuItem key={plan.id_plan_pago} value={plan.id_plan_pago}>
                {plan.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <TextField
        label="Total"
        type="number"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Registrar Venta
      </Button>
    </Box>
  );
}

export default SaleForm;