import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Logo } from "../../templates/Logo";
import { CardProduct } from "../../common/CardProduct";
import styles from "./ProductosGenero.module.css";

export const ProductosGenero = () => {
  const { genero } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!genero) {
      console.error(" No se recibió género en la URL");
      setError(true);
      return;
    }

    setError(false);
    setLoading(true);

    const fetchProductos = async () => {
      try {
        console.log("🔍 Buscando productos con género parecido a:", genero);
        const response = await axios.get(`http://localhost:3000/Productos/categoria/${genero}`);
        
        if (!response.data || response.data.length === 0) {
          console.warn("⚠️ No se encontraron productos similares.");
          setError(true);
          return;
        }

        setProductos(response.data);
      } catch (error) {
        console.error(" Error en la búsqueda:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [genero]);

  if (loading) {
    return <p className={styles.loading}>Cargando productos...</p>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.error}>
          No se encontraron productos para "{genero}". Intenta con un término más general o revisa la ortografía.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.encabezado}>
        <Logo />
        <h1 className={styles.titulo}>Productos relacionados con: {genero}</h1>
      </div>

      <div className={styles.productContainer}>
        {productos.map((producto) => (
          <CardProduct key={producto.id} product={producto} />
        ))}
      </div>
    </>
  );
};
