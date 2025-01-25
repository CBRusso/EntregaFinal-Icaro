const connection = require("../data/data");
const bcrypt = require("bcrypt");
const userId = require("./autenticacionControllers")

// Función ver todos los usarios - solo admin
const getallUsers = (req, res) => {
  connection.query("SELECT id, nombre, email, rol FROM usuarios", (err, result, fields) => {
    
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

//Actualizar email usuario
const actUser = (req,res) => {

  const {emailNuevo} = req.body;
  const userId = req.session.usuario.id

  console.log (req.session)
  console.log("Nuevo email:", emailNuevo);
  console.log("ID del usuario:", userId);

  if (!emailNuevo) {
        return res.status(400).send("El nuevo email es obligatorio");
      }
  
  connection.query("UPDATE usuarios SET email = ? WHERE id_usuario = ?", [emailNuevo, userId], (error, results) => {
        if (error) {
          console.error("Error al actualizar el email:", error);
          return res.status(500).send("Error al actualizar el email");
        }

        console.log(results);
    
        res.status(200).send("Email actualizado con éxito");

      });
    };

    const newUser= (req, res) => {
      const { nombre, email, password } = req.body;
    
      if (!nombre || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
      }
    
      const query = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
      connection.query(query, [nombre, email, password], (err, result) => {
        if (err) {
          console.error("Error al registrar usuario:", err);
          return res.status(500).json({ message: "Error al registrar usuario" });
        }
        res.status(201).json({ message: "Usuario registrado correctamente" });
      });
    };




module.exports = { getallUsers, actUser, newUser };
