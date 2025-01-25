import React from "react";
import { ShoppingCartOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useCartStore } from "../../../stores/CartStore";
import style from "./CardProduct.module.css";

const { Meta } = Card;

export const CardProduct = ({ product }) => {
  const { cart, addCart, removeCart, deleteProduct } = useCartStore();
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.cantidad : 0;

  return (
    <Card
      className={style.card}
      style={{
        width: 220,
        margin: "10px auto", // Centrar la tarjeta
        borderRadius: 10,
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s",
        textAlign: "center", // Asegurar que el contenido esté centrado
      }}
      cover={
        <img 
          alt={product.nombre} 
          src={product.imagen_url} 
          style={{ height: "200px", objectFit: "cover", borderRadius: "10px 10px 0 0" }} 
        />
      }
      actions={[
        quantity === 0 ? (
          <ShoppingCartOutlined
            key="cart"
            className={style.cartIcon}
            style={{ fontSize: "20px", cursor: "pointer", color: "#1890ff"}}
            onClick={() => addCart(product)}
          />
        ) : (
          <div 
            key="counter"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center", // Centrar el contenido horizontalmente
              borderRadius: "20px",
              padding: "5px 10px",
              width: "100%", // Ocupar todo el ancho disponible
              marginTop: "5px", // Espaciado con el contenido de arriba
            }}
          >
            <MinusOutlined 
              className={style.minusIcon}
              style={{ color: quantity > 0 ? "black" : "gray", fontSize: "18px", cursor: quantity > 0 ? "pointer" : "default" }} 
              onClick={() => quantity > 1 ? removeCart(product) : deleteProduct(product.id)}
            />
            <span style={{ fontSize: "16px", fontWeight: "bold", padding: "0 12px" }}>{quantity}</span>
            <PlusOutlined 
              className={style.plusIcon}
              style={{ color: "green", fontSize: "18px", cursor: "pointer" }} 
              onClick={() => addCart(product)}
            />
          </div>
        )
      ]}
    >
      <Meta
        title={product.nombre}
        description={
          <div style={{ textAlign: "center" }}>
            <p>{product.descripcion}</p>
            <p><strong>Precio:</strong> ${product.precio}</p>
            <p><strong>Género:</strong> {product.genero}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
          </div>
        }
      />
    </Card>
  );
};
