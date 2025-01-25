const express = require("express");
const router = express.Router();
const { guardarOrden } = require("../controllers/ordersControllers");


router.post("/", guardarOrden);

module.exports = router;
