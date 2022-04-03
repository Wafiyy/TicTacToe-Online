const info = require("../controllers/info")
const checkToken = require("../middlewares/checkToken");
const router  = require("express").Router()

router.get("/info",checkToken,info)

module.exports = router