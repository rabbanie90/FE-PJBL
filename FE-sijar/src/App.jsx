import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPages from "./pages/LoginPages";
import DashboardHome from "./pages/DashboardHome";
import PeminjamanPage from "./pages/PeminjamanPage";
import RiwayatPage from "./pages/RiwayatPage";
import InventarisPage from "./pages/InventarisPage";
import JurusanPage from "./pages/JurusanPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPages />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/peminjaman" element={<PeminjamanPage />} />
        <Route path="/dashboard/riwayat" element={<RiwayatPage />} />
        <Route path="/dashboard/inventaris" element={<InventarisPage />} />
        <Route path="/dashboard/jurusan" element={<JurusanPage />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
