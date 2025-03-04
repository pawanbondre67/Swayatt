import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/';
import Dashboard from './pages/DashBoard';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';

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
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;