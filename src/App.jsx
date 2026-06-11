import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Profil from "./pages/profil";
import Pengguna from "./pages/pengguna";
import PenggunaCreate from "./pages/penggunacreate";
import PenggunaUpdate from "./pages/penggunaupdate";
import Perangkat from "./pages/perangkat";
import PerangkatCreate from "./pages/perangkatcreate";
import PerangkatUpdate from "./pages/perangkatupdate";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="pengguna" element={<Pengguna />} />
          <Route path="pengguna/tambah" element={<PenggunaCreate />} />
          <Route path="pengguna/update/:id" element={<PenggunaUpdate />} />
          <Route path="perangkat" element={<Perangkat />} />
          <Route path="perangkat/tambah" element={<PerangkatCreate />} />
          <Route path="perangkat/update/:id" element={<PerangkatUpdate />} />
          <Route path="profil" element={<Profil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;