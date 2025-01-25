const { Router } = require("express");
const logIn = require("../controllers/autenticacionControllers");
const router = Router();

router.post("/",logIn)

module.exports = router;

