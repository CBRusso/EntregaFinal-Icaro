const connection = require("../data/data");

//Todos los productos
const allProducts = (req, res) => {
  connection.query("SELECT * FROM productos", (err, result, fields) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

//Crear Producto
const newProduct = (req, res) => {
  const { nombre, descripcion, precio, stock, imagen_url, genero } = req.body;

  const precioNum = parseFloat(precio);
  const stockNum = parseInt(stock, 10);

  if (!nombre || !descripcion || isNaN(precioNum) || isNaN(stockNum) || !imagen_url || !genero) {
    return res.status(400).json({ error: "Todos los campos son obligatorios y deben ser válidos." });
  }

  const query = `
    INSERT INTO productos (nombre, descripcion, precio, stock, imagen_url, genero)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  const values = [nombre, descripcion, precioNum, stockNum, imagen_url, genero];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("Error al insertar el producto:", err);
      return res.status(500).json({ error: "Error al insertar el producto", details: err.message });
    }
    res.status(201).json({ message: "Producto creado con éxito", productoId: result.insertId });
  });
};

  
//Eliminar producto
const deleteProduct = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Se requiere un ID para eliminar el producto." });
  }

  const query = "DELETE FROM productos WHERE id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error(" Error al eliminar el producto:", err);
      return res.status(500).json({ error: "Error al eliminar el producto", details: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró el producto con el ID proporcionado." });
    }

    res.json({ message: "Producto eliminado con éxito" });
  });
};
 
//Actualizar producto
const actualizarProducto = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, imagen_url, genero } = req.body;

  const precioNum = parseFloat(precio);
  const stockNum = parseInt(stock, 10);

  if (!id || !nombre || !descripcion || isNaN(precioNum) || isNaN(stockNum) || !imagen_url || !genero) {
    return res.status(400).json({ error: "Todos los campos son obligatorios y deben ser válidos." });
  }

  const query = `
    UPDATE productos 
    SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen_url = ?, genero = ?
    WHERE id = ?;
  `;

  const values = [nombre, descripcion, precioNum, stockNum, imagen_url, genero, id];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("Error al actualizar el producto:", err);
      return res.status(500).json({ error: "Error al actualizar el producto", details: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró el producto con el ID proporcionado." });
    }

    console.log(" Producto actualizado con éxito:", result);
    res.json({ message: "Producto actualizado con éxito" });
  });
};

module.exports = { allProducts, newProduct, deleteProduct, actualizarProducto };
