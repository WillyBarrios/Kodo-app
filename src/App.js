import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Home from './pages/Home';
import Products from './pages/Products';
import Sales from './pages/Sales';
import PaymentPlans from './pages/PaymentPlans';
import RoutesPage from './pages/Routes';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/products" element={user ? <Products /> : <Login />} />
        <Route path="/sales" element={user ? <Sales /> : <Login />} />
        <Route path="/payment-plans" element={user ? <PaymentPlans /> : <Login />} />
        <Route path="/routes" element={user ? <RoutesPage /> : <Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;