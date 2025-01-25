import React, { useState, useEffect } from "react";
import axios from "axios"; // ✅ Importar axios
import { Logo } from "../../templates/Logo";
import { CardProduct } from "../../common/CardProduct"; // ✅ Asegurar importación
import styles from "./MenoraMayor.module.css";

export const MenoraMayor = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(false);

  
  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Productos/des");
      console.log("Productos recibidos:", response.data); 
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  if (error) {
    return <p>Ocurrió un error al cargar los productos. Intenta nuevamente más tarde.</p>;
  }

  if (productos.length === 0) {
    return <p>Cargando productos...</p>;
  }

  return (
    <>
      <div className={styles.encabezado}>
        <Logo />
        <div className={styles.inicio}>
          <h1 className={styles.titulo}>Tienda Orchidaceae</h1>
        </div>
      </div>

      {/*  Contenedor con flexbox para mostrar las tarjetas */}
      <div className={styles.productContainer}>
        {productos.map((producto) => {
          console.log("Producto a renderizar:", producto); // Debug en consola
          return <CardProduct key={producto.id} product={producto} />;
        })}
      </div>
    </>
  );
};
