const { Router } = require("express");
const router = Router();
const Users = require("../controllers/usuariosControllers");
const {isAutenticated,isAdmin} = require ("../middleware/autenticate")

router.get("/",isAdmin, Users.getallUsers);
router.post("/email",isAutenticated, Users.actUser)
router.post("/register", Users.newUser);

module.exports = router;
