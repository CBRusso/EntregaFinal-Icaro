import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Select, Card, List } from "antd";
import { useCartStore } from "../../../stores/CartStore"; // Importar el store del carrito

export const ConfirmOrder = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const { cart, clearCart } = useCartStore(); // Obtener carrito y función para vaciarlo

  // 🔹 Estado para controlar el tipo de envío
  const [tipoEnvio, setTipoEnvio] = useState("Domicilio");

  // Obtener datos del usuario desde localStorage
  const storedUserDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
  const total = cart.reduce((sum, item) => sum + parseFloat(item.precio) * item.cantidad, 0);

  useEffect(() => {
    //  Bloquear acceso a administradores
    if (storedUserDetails.rol === "admin") {
      message.error("Los administradores no pueden confirmar compras.");
      navigate("/");
      return;
    }

    if (!orderConfirmed && !storedUserDetails.id) {
      message.error("Error: Falta información del usuario.");
      navigate("/");
    } else {
      form.setFieldsValue({
        nombre: storedUserDetails.nombre,
        email: storedUserDetails.email,
        direccion: storedUserDetails.direccion || "",
        telefono: storedUserDetails.telefono || "",
      });
    }
  }, [form, storedUserDetails, navigate, orderConfirmed]);

  const handleConfirmOrder = async (values) => {
    setLoading(true);

    const order = {
      productos: cart,
      total,
      usuario: {
        id: storedUserDetails.id,
        nombre: values.nombre,
        email: values.email,
        direccion: tipoEnvio === "Domicilio" ? values.direccion : "Retiro en tienda",
        telefono: values.telefono,
      },
      envio: tipoEnvio,
    };

    console.log("Enviando orden:", order);

    try {
      const response = await fetch("http://localhost:3000/Orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Orden confirmada:", data);

        if (!data.orderId) {
          throw new Error("El servidor no devolvió un número de orden.");
        }

        //  Vaciar carrito en Zustand y localStorage
        clearCart();

        //  Evitar mensaje de "carrito vacío", solo mostrar confirmación de orden
        setOrderConfirmed(true);

        //  Mensaje de éxito y redirección
        message.success(`Orden confirmada con éxito. Número de orden: #${data.orderId}`);
        setTimeout(() => navigate("/"), 3000);
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Hubo un error al confirmar la orden.");
      }
    } catch (err) {
      message.error("Error en la conexión con el servidor.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h2>Confirmación de Orden</h2>

      {/* 📦 Lista de productos en la orden */}
      {cart.length > 0 && (
        <Card title="Detalle de Productos" style={{ marginBottom: "20px" }}>
          <List
            dataSource={cart}
            renderItem={(item) => (
              <List.Item>
                <div>
                  <strong>{item.nombre}</strong> - ${item.precio} x {item.cantidad} ={" "}
                  <strong>${(item.precio * item.cantidad).toFixed(2)}</strong>
                </div>
              </List.Item>
            )}
          />
          <h3 style={{ textAlign: "right" }}>Total: ${total.toFixed(2)}</h3>
        </Card>
      )}

      {/*  Formulario de confirmación */}
      <Form form={form} layout="vertical" onFinish={handleConfirmOrder}>
        <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: "Ingrese su nombre" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Ingrese un email válido" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Teléfono" name="telefono" rules={[{ required: true, message: "Ingrese su teléfono" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Tipo de Envío" name="envio" rules={[{ required: true, message: "Seleccione una opción de envío" }]}>
          <Select
            value={tipoEnvio}
            onChange={(value) => {
              setTipoEnvio(value);
              form.setFieldsValue({ direccion: value === "Domicilio" ? storedUserDetails.direccion : "No se requiere" });
            }}
          >
            <Select.Option value="Domicilio">Envío a Domicilio</Select.Option>
            <Select.Option value="Retiro en Tienda">Retiro en Tienda</Select.Option>
          </Select>
        </Form.Item>

        {/*  Campo de Dirección (se renderiza solo si se elige "Domicilio") */}
        {tipoEnvio === "Domicilio" && (
          <Form.Item label="Dirección de Envío" name="direccion" rules={[{ required: true, message: "Ingrese su dirección" }]}>
            <Input />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {loading ? "Confirmando..." : "Confirmar Orden"}
          </Button>
        </Form.Item>
      </Form>

      {/*  Datos de contacto de la empresa */}
      <Card title="Contacto de la Empresa" style={{ marginTop: "20px" }}>
        <p><strong>Nombre:</strong> Tienda Online Orchidaceae</p>
        <p><strong>Email:</strong> contacto-orchidaceae@tienda.com</p>
        <p><strong>Teléfono:</strong> +54 9 351 456 7890</p>
        <p><strong>Dirección:</strong> Av. Colón 123, Córdoba, Argentina</p>
      </Card>
    </div>
  );
};
