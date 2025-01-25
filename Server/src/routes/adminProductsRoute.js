const { Router } = require("express");
const controllersProducts = require("../controllers/adminProductosControllers");
const { isAdmin } = require("../middleware/autenticate");
const router = Router();

router.post("/crear",isAdmin, controllersProducts.newProduct);
router.delete("/borrar/:id",isAdmin, controllersProducts.deleteProduct);
router.put("/actualizar/:id",isAdmin, controllersProducts.actualizarProducto);

module.exports = router