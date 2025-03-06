import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/';
import Dashboard from './pages/DashBoard';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import Navbar from './components/NavBar';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navbar />
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;