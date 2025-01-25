
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Contacto } from "./components/pages/Contacto";
import { Navbar } from "./components/templates/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { LoginPage } from "./components/pages/LogininPage";
import { ConfirmOrder } from "./components/pages/ConfirmOrder";
import { MayoraMenor } from "./components/pages/MayoraMenor";
import { MenoraMayor } from "./components/pages/MenoraMayor";
import { ProductosGenero } from "./components/pages/ProductosGenero";
import { AdminProductos } from "./components/pages/AdminProductos";


function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/confirmar" element={<ConfirmOrder />} />
        <Route path="/asc" element={<MayoraMenor />} />
        <Route path="/des" element={<MenoraMayor />} />
        <Route path="/productos/categoria/:genero" element={<ProductosGenero />} />
        <Route path="/admin" element={<AdminProductos />} />
      </Routes>
    </Router>
    
   
    </>
  );
}

export default App;