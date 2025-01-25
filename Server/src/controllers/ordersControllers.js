const connection = require("../data/data");

const guardarOrden = (req, res) => {
  const { productos, total, usuario, envio } = req.body;
  

  if (!productos || !total || !usuario || !usuario.id) {
    return res.status(400).json({ error: "Datos incompletos en la orden" });
  }


  const query = "INSERT INTO ordenes (productos, total, usuario_id, envio) VALUES (?, ?, ?, ?)";
  const values = [JSON.stringify(productos), total, usuario.id, envio]; 

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("Error al guardar la orden:", err);
      return res.status(500).json({ error: "Error al guardar la orden en la base de datos" });
    }
    res.status(201).json({ message: "Orden guardada exitosamente", orderId: result.insertId });
  });
};

module.exports = {
  guardarOrden,
};
