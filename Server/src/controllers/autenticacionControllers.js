const connection = require("../data/data");

const logIn = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Debes proporcionar credenciales válidas" });
  }

  const query = "SELECT id, nombre, email, rol, password FROM usuarios WHERE email = ?";
  
  connection.query(query, [email], (error, results) => {
    if (error) {
      console.error("❌ Error en la consulta de autenticación:", error);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (results.length === 0) {
      console.log("❌ Usuario no encontrado:", email);
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const usuario = results[0];

    // 🔹 Comparación de contraseña en texto plano
    if (usuario.password !== password) {
      console.log("❌ Contraseña incorrecta para:", email);
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // ✅ Guardar usuario en sesión correctamente
    req.session.usuario = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    };

    console.log("✅ Sesión después de login:", req.session);

    // console.log("✅ Usuario guardado en sesión:", req.session.usuario);

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
      
    });
  });
};

module.exports = logIn;
