import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Box, Typography } from '@mui/material';
import ProductForm from '../components/ProductForm';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('producto')
      .select('*, categoria(nombre)')
      .eq('activo', true);
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data);
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('producto')
      .update({ activo: false })
      .eq('id_producto', id);
    if (error) {
      console.error('Error deleting product:', error);
    } else {
      fetchProducts();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Productos
      </Typography>
      <ProductForm onProductAdded={fetchProducts} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id_producto}>
              <TableCell>{product.nombre}</TableCell>
              <TableCell>{product.precio_base}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.categoria.nombre}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" sx={{ mr: 1 }}>
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(product.id_producto)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default Products;