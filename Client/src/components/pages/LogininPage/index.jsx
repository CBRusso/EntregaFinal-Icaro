import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Tabs } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./login.module.css";

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    console.log("Intentando iniciar sesión con:", values);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/Aut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, password: values.password, rol: values.rol }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("Respuesta del backend:", data);

      if (response.ok) {
        message.success("Inicio de sesión exitoso");
        localStorage.setItem("userDetails", JSON.stringify(data.usuario));
        navigate("/"); //  Redirige a la página principal
      } else {
        message.error(data.message || "Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      message.error("Error en la conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values) => {
    console.log("Registrando usuario:", values);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/Usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log("Respuesta del backend:", data);

      if (response.ok) {
        message.success("Registro exitoso. Redirigiendo a la página de inicio...");
        
        //  Guardar usuario en localStorage
        localStorage.setItem("userDetails", JSON.stringify(data.usuario));

        //  Redirigir a la página de inicio después de 2 segundos
        setTimeout(() => navigate("/"), 2000);
      } else {
        message.error(data.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      message.error("Error en la conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["login-page"]}>
      <h1 className={styles["login-title"]}>Bienvenido</h1>

      <Tabs defaultActiveKey="login">
        {/*  Pestaña para Iniciar Sesión */}
        <Tabs.TabPane tab="Iniciar Sesión" key="login">
          <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Por favor, ingresa tu email!" },
                { type: "email", message: "El email no es válido!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: "Por favor, ingresa tu contraseña!" }]}
            >
              <Input.Password placeholder="Contraseña" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {loading ? "Cargando..." : "Iniciar Sesión"}
              </Button>
            </Form.Item>
          </Form>
        </Tabs.TabPane>

        {/*  Pestaña para Registro */}
        <Tabs.TabPane tab="Registrarse" key="register">
          <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
            <Form.Item
              label="Nombre"
              name="nombre"
              rules={[{ required: true, message: "Por favor, ingresa tu nombre!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Por favor, ingresa tu email!" },
                { type: "email", message: "El email no es válido!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: "Por favor, ingresa tu contraseña!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {loading ? "Registrando..." : "Registrarse"}
              </Button>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
