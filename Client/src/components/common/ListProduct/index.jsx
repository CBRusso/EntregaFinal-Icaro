import { useState, useEffect } from "react";
import { CardProduct } from "../CardProduct";
import axios from "axios";

export const ListProduct = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(false);

  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Productos");
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
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: "20px",
        padding: "20px",
      }}
    >
      {productos.map((producto) => {
        console.log("Producto:", producto); 
        return <CardProduct key={producto.id} product={producto} />;
      })}

    </div>
  );
};
