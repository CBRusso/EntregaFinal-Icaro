const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// 🔹 Rutas
const usuariosRoutes = require("./routes/usuariosRoutes");
const autenticRoutes = require("./routes/auntenticacionRoutes");
const theProducts = require("./routes/productosRoutes");
const adminProducts = require("./routes/adminProductsRoute");
const ofertasRoutes = require("./routes/ofertasRoutes");
const ordersRoutes = require("./routes/orderRoutes");

// Configuración de la sesión 
const unDia = 1000 * 60 * 60 * 24;

// Middleware de CORS
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

// Middleware de sesiones
app.use(
  session({
    secret: "123456",   
    resave: false,
    saveUninitialized: false, 
    cookie: {
      httpOnly: true, 
      secure: false,
      sameSite: "lax", 
      maxAge: unDia,
    },
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Middleware para imprimir la sesión en cada solicitud 
app.use((req, res, next) => {
  console.log("🔥 Sesión en backend:", req.session);
  next();
});

app.use("/img", express.static("public"));

// Rutas
app.use("/Usuarios", usuariosRoutes);
app.use("/Aut", autenticRoutes);
app.use("/Productos", theProducts);
app.use("/Admin", adminProducts);
app.use("/Ofertas", ofertasRoutes);
app.use("/Orders", ordersRoutes);
app.get("/session", (req, res) => {
  console.log("🔍 Sesión actual:", req.session.usuario);
  res.json(req.session.usuario);
})

// Iniciar el servidor
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
