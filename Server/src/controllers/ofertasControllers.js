const connection = require("../data/data");

const allOfertas = (req, res) => {
  connection.query("SELECT * FROM ofertas", (err, results) => {
    if (err) {
      console.error("Error al obtener las ofertas:", err.message);
      return res.status(500).json({ error: "Error interno al obtener las ofertas" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No se encontraron ofertas" });
    }

    res.status(200).json(results);
  });
};

module.exports = { allOfertas };
