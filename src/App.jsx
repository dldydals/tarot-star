import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Tarrot from './pages/client/Tarrot';
import TarrotAdmin from './pages/admin/TarrotAdmin';
import TarrotAdminLogin from './pages/admin/TarrotAdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Tarrot />} />

        {/* Legacy Redirect */}
        <Route path="/tarrot" element={<Navigate to="/" replace />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<TarrotAdmin />} />
        <Route path="/admin/login" element={<TarrotAdminLogin />} />

        {/* Legacy/Alternative Routes - Keeping as requested or for compatibility */}
        <Route path="/tarrot-admin" element={<Navigate to="/admin" replace />} />
        <Route path="/tarrot-admin/login" element={<Navigate to="/admin/login" replace />} />

        {/* Rarrot (Tarrot alternative) standalone routes - keeping as is */}
        <Route path="/rarrot" element={<Tarrot />} />
        <Route path="/rarrot/tarrot-admin" element={<TarrotAdmin />} />
        <Route path="/rarrot/tarrot-admin/login" element={<TarrotAdminLogin />} />

      </Routes>
    </Router>
  );
}

export default App;


