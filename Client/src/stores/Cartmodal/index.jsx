import React, { useEffect, useState } from "react";
import { Modal, List, Button, Image, Typography } from "antd";
import { useCartStore } from "../CartStore";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const CartModal = ({ isOpen, onClose }) => {
  const { cart, addCart, removeCart, deleteProduct, clearCart } = useCartStore();
  const [cartState, setCartState] = useState([]);
  const navigate = useNavigate(); // Inicializar navigate

  useEffect(() => {
    if (isOpen) {
      setCartState(cart);
    }
  }, [isOpen, cart]);

  const totalCarrito = cartState.reduce(
    (acc, item) => acc + parseFloat(item.precio) * item.cantidad,
    0
  );

  const handleBuy = () => {
    onClose();
    navigate("/confirmar"); // Redirige a la página de confirmación
  };

  return (
    <Modal
      title="Carrito de Compras"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button
          key="clear"
          onClick={() => {
            clearCart();
            setCartState([]);
          }}
          danger
        >
          Vaciar Carrito
        </Button>,
        <Button
          key="buy"
          type="primary"
          onClick={handleBuy} // Llama a la función handleBuy
          disabled={cartState.length === 0}
        >
          Comprar
        </Button>,
        <Button key="close" onClick={onClose}>
          Cerrar
        </Button>,
      ]}
    >
      {cartState.length === 0 ? (
        <Typography.Paragraph>Tu carrito está vacío.</Typography.Paragraph>
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={cartState}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button onClick={() => addCart(item)}>+</Button>,
                  <span>{item.cantidad}</span>,
                  <Button
                    onClick={() =>
                      item.cantidad > 1 ? removeCart(item) : deleteProduct(item.id)
                    }
                  >
                    -
                  </Button>,
                  <Button
                    type="text"
                    danger
                    onClick={() => deleteProduct(item.id)}
                  >
                    Eliminar
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Image width={50} src={item.imagen_url} />}
                  title={item.nombre}
                  description={`Precio unitario: $${item.precio} | Subtotal: $${(
                    item.cantidad * item.precio
                  ).toFixed(2)}`}
                />
              </List.Item>
            )}
          />
          <Typography.Title level={4}>Total: ${totalCarrito.toFixed(2)}</Typography.Title>
        </>
      )}
    </Modal>
  );
};

export default CartModal;
