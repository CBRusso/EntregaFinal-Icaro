const express = require("express");
const router = express.Router();
const { allOfertas } = require("../controllers/ofertasControllers");


router.get("/", allOfertas);

module.exports = router;
