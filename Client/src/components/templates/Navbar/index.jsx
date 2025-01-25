import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Navbar.module.css";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Button } from "antd";
import { useCartStore } from "../../../stores/CartStore";
import CartModal from "../../../stores/Cartmodal";

export const Navbar = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); //  Estado para capturar el término de búsqueda
  const { cart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  //  Manejar la búsqueda cuando se presiona el botón
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/productos/categoria/${searchTerm.toLowerCase()}`);
    }
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${style.navbar}`}>
        <div className={`container-fluid ${style.container}`}>
          <Link className={`navbar-brand ${style.brand}`} to="/">
            Inicio
          </Link>
          <button
            className={`navbar-toggler ${style.toggler}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${style.collapse}`} id="navbarSupportedContent">
            <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${style.nav}`}>
              <li className={`nav-item dropdown ${style.dropdown}`}>
                <Link className={`nav-link dropdown-toggle ${style.navLink}`} to="#" role="button" data-bs-toggle="dropdown">
                  Filtro
                </Link>
                <ul className={`dropdown-menu ${style.dropdownMenu}`}>
                  <li>
                    <Link className={`dropdown-item ${style.dropdownItem}`} to="/Asc">
                      Mayor Precio
                    </Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item ${style.dropdownItem}`} to="/Des">
                      Menor Precio
                    </Link>
                  </li>
                </ul>
              </li>
              <li className={`nav-item ${style.navItem}`}>
                <Link className={`nav-link ${style.navLink}`} to="/contacto">
                  Contacto
                </Link>
              </li>
            </ul>

            {/* 🔎 FORMULARIO DE BÚSQUEDA */}
            <form className={`d-flex ${style.searchForm}`} role="search" onSubmit={handleSearch}>
              <input
                placeholder="Buscar por género"
                className={`form-control me-2 ${style.searchInput}`}
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className={`btn btn-outline-success ${style.searchButton}`} type="submit">
                Buscar
              </button>
            </form>

            {isAuthenticated ? (
              <Button onClick={handleLogout} style={{ marginRight: "15px" }}>
                Cerrar Sesión
              </Button>
            ) : (
              <Button type="text" onClick={() => navigate("/Login")} style={{ marginRight: "15px" }}>
                <UserOutlined style={{ fontSize: "24px", color: "#000", marginLeft:"10px" }} />
              </Button>
            )}

            <div className={style.cartContainer} onClick={() => setCartOpen(true)} style={{ cursor: "pointer", position: "relative", display: "flex", alignItems: "center", gap: "5px" }}>
              <ShoppingCartOutlined className={style.cartIcon} style={{ fontSize: "24px", color: "#000", marginLeft: "8px" }} />
              {cart.length > 0 && (
                <Badge count={cart.reduce((acc, item) => acc + item.cantidad, 0)} showZero={false} className={style.cartBadge} style={{ backgroundColor: "#ff4d4f", fontSize: "12px", height: "18px", minWidth: "18px", lineHeight: "18px", borderRadius: "50%" }} />
              )}
            </div>
          </div>
        </div>
      </nav>

      {isCartOpen && <CartModal isOpen={isCartOpen} onClose={() => setCartOpen(false)} />}
    </>
  );
};
