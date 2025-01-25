import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Button, Table, message } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./AdminProductos.module.css";

export const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userDetails"));
    if (!userData || userData.rol !== "admin") {
      message.error("No tienes permisos para acceder.");
      navigate("/");
      return;
    }
    setUser(userData);
    fetchProductos();
  }, [navigate]);

  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Productos");
      setProductos(response.data);
    } catch (error) {
      message.error("Error al cargar los productos");
    }
  };

  const handleAddOrUpdate = async (values) => {
    try {
      if (editingProduct) {
        await axios.put(`http://localhost:3000/Admin/actualizar/${editingProduct.id}`, values, { withCredentials: true });
        message.success("Producto actualizado correctamente");
      } else {
        await axios.post("http://localhost:3000/Admin/crear", values, { withCredentials: true });
        message.success("Producto agregado correctamente");
      }
      fetchProductos();
      form.resetFields();
      setEditingProduct(null);
    } catch (error) {
      message.error("Error al guardar el producto");
    }
  };

  const handleEdit = (producto) => {
    form.setFieldsValue(producto);
    setEditingProduct(producto);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/Admin/borrar/${id}`, { withCredentials: true });
      message.success("Producto eliminado correctamente");
      fetchProductos();
    } catch (error) {
      message.error("Error al eliminar el producto");
    }
  };

  if (!user) return null; // Oculta todo si el usuario no está autenticado

  return (
    <div className={styles.adminContainer}>
      <h1>Gestión de Productos</h1>
      <Form form={form} layout="vertical" onFinish={handleAddOrUpdate} className={styles.form}>
        <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="descripcion" label="Descripción" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="precio" label="Precio" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="imagen_url" label="Imagen URL" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="genero" label="Género" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {editingProduct ? "Actualizar Producto" : "Agregar Producto"}
        </Button>
      </Form>

      <Table dataSource={productos} rowKey="id" className={styles.table}>
        <Table.Column title="Nombre" dataIndex="nombre" key="nombre" />
        <Table.Column title="Precio" dataIndex="precio" key="precio" />
        <Table.Column title="Stock" dataIndex="stock" key="stock" />
        <Table.Column
          title="Acciones"
          render={(producto) => (
            <>
              <Button onClick={() => handleEdit(producto)}>Editar</Button>
              <Button danger onClick={() => handleDelete(producto.id)}>Eliminar</Button>
            </>
          )}
        />
      </Table>
    </div>
  );
};
