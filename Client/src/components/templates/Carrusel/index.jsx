import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import styles from "./carousel.module.css"; 

export const CarouselComponent = () => {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const response = await fetch("http://localhost:3000/Ofertas");
        if (!response.ok) {
          throw new Error("Error al obtener las ofertas");
        }
        const data = await response.json();
        setOfertas(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };

    fetchOfertas();
  }, []);

  if (loading) {
    return <p className={styles["loading"]}>Cargando ofertas...</p>;
  }

  if (error) {
    return <p className={styles["error"]}>Error al cargar las ofertas. Intenta más tarde.</p>;
  }

  return (
    <Carousel autoplay className={styles["carousel"]}>
      {ofertas.map((oferta) => (
        <div key={oferta.id_oferta} className={styles["carousel-item"]}>
          <div className={styles["carousel-image-container"]}>
            <img
              src={oferta.imagen_url}
              alt={oferta.nombre}
              className={styles["carousel-image"]}
            />
          </div>
          <div className={styles["carousel-content"]}>
            <h3 className={styles["carousel-title"]}>{oferta.nombre}</h3>
            <p className={styles["carousel-description"]}>{oferta.descripcion}</p>
            <p className={styles["carousel-price"]}>
              <strong>${oferta.precio}</strong>
            </p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};
