import { useState, useEffect } from 'react';
import { supabase } from '../ услуги/supabase';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

function ProductForm({ onProductAdded }) {
  const [nombre, setNombre] = useState('');
  const [precioBase, setPrecioBase] = useState('');
  const [stock, setStock] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    const { data, error } = await supabase.from('categoria').select('*');
    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategorias(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('producto').insert([
      {
        nombre,
        precio_base: parseFloat(precioBase),
        stock: parseInt(stock),
        id_categoria: parseInt(idCategoria),
      },
    ]);
    if (error) {
      console.error('Error adding product:', error);
    } else {
      onProductAdded();
      setNombre('');
      setPrecioBase('');
      setStock('');
      setIdCategoria('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <TextField
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Precio Base"
        type="number"
        value={precioBase}
        onChange={(e) => setPrecioBase(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Stock"
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Categoría</InputLabel>
        <Select
          value={idCategoria}
          onChange={(e) => setIdCategoria(e.target.value)}
          label="Categoría"
        >
          {categorias.map((categoria) => (
            <MenuItem key={categoria.id_categoria} value={categoria.id_categoria}>
              {categoria.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Agregar Producto
      </Button>
    </Box>
  );
}

export default ProductForm;