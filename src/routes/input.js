const input = require("../controllers/input")
const checkToken = require("../middlewares/checkToken");
const router  = require("express").Router()

router.post("/input",checkToken,input)

module.exports = router