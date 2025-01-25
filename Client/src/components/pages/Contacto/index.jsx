import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./Contacto.module.css";

export const Contacto = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("Datos enviados:", values);
    setLoading(true);

    try {
      // Simulación de envío de formulario
      setTimeout(() => {
        message.success("Mensaje enviado con éxito. Nos contactaremos contigo pronto.");
        setLoading(false);
      }, 2000);
    } catch (error) {
      message.error("Hubo un error al enviar el mensaje.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.title}>Contáctanos</h1>
      <p className={styles.description}>Déjanos tu consulta y te responderemos a la brevedad.</p>

      <Form name="contact" layout="vertical" onFinish={onFinish} className={styles.contactForm}>
        <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: "Por favor, ingresa tu nombre." }]}>
          <Input prefix={<UserOutlined />} placeholder="Tu Nombre" />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Ingresa un email válido." }]}>
          <Input prefix={<MailOutlined />} placeholder="tucorreo@example.com" />
        </Form.Item>

        <Form.Item name="telefono" label="Teléfono">
          <Input prefix={<PhoneOutlined />} placeholder="Opcional" />
        </Form.Item>

        <Form.Item name="mensaje" label="Mensaje" rules={[{ required: true, message: "Por favor, ingresa tu mensaje." }]}>
          <Input.TextArea rows={4} placeholder="Escribe tu consulta aquí..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className={styles.submitButton}>
            Enviar Mensaje
          </Button>
        </Form.Item>
      </Form>

      {/* Información de contacto */}
      <div className={styles.contactInfo}>
        <h2>Información de Contacto</h2>
        <p><strong>Email:</strong> contacto@orchidaceae.com</p>
        <p><strong>Teléfono:</strong> +54 11 2345 6789</p>
        <p><strong>Dirección:</strong> Av. de las Orquídeas 123, Buenos Aires, Argentina</p>
      </div>
    </div>
  );
};
