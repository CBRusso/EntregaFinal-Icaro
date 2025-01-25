const { Router } = require("express");
const { allProducts,downPriceProducts,upPriceProducts, filterCategory } = require("../controllers/productosControllers");
const router = Router();

router.get("/",allProducts);
router.get("/asc",downPriceProducts);
router.get("/des",upPriceProducts);
router.get("/categoria/:categoria",filterCategory);

module.exports = router

