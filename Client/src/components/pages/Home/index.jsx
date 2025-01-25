import React from "react";
import { Logo } from "../../templates/Logo";
import style from "./home.module.css";
import { CarouselComponent } from "../../templates/Carrusel";
import { ListProduct } from "../../common/ListProduct";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
    <div className={style.encabezado}>
      <Logo />
      <div className={style.inicio}>
      <h1 className={style.titulo}>Tienda Orchidaceae</h1>
      <p>¡Bienvenidos a nuestra tienda de orquídeas!</p>
      <p>Podrás encontrar una amplia variedad de orquídeas, desde las más comunes hasta las más exóticas.</p>
      </div>
    </div>
    <CarouselComponent/>
    <ListProduct/>
    <div>
    <Link className={`nav-link ${style.navLink}`} to="/admin">
                  Administradores
                </Link>

    </div>
     
    </>
  );
};
