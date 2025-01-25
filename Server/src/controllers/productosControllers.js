const connection = require("../data/data");

//Todos los productos
const allProducts = (req, res) => {
  connection.query("SELECT * FROM productos", (err, result, fields) =>{

  if (err) return res.status(500).json(err);
  res.json(result);
  
  });

};

//Ordenar de menor a mayor costo
const upPriceProducts = (req, res) => {
  connection.query("SELECT * FROM productos ORDER BY precio ASC" , (err, result, fields) =>{

  if (err) return res.status(500).json(err);
  res.json(result);
  
  });

};

//Ordenar de manera descendente
const downPriceProducts = (req, res) => {
  connection.query("SELECT * FROM productos ORDER BY precio DESC", (err, result, fields) =>{

  if (err) return res.status(500).json(err);
  res.json(result);
  
  });

};


//Filtrar por categoría

const filterCategory = (req, res) => {
  const { categoria } = req.params; // ✅ Usa el nombre correcto del parámetro en la ruta

  connection.query(
   "SELECT * FROM productos WHERE LOWER(genero) LIKE LOWER(?)",
    [`%${categoria}%`], 
    (err, result) => {
      if (err) {
        console.error("Error al filtrar productos:", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "No se encontraron productos en esta categoría" });
      }
      res.json(result);
    }
  );
};




module.exports = { allProducts,upPriceProducts,downPriceProducts, filterCategory };
