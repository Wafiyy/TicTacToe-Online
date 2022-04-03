const checkToken = require("../middlewares/checkToken")
const start = require("../controllers/start")
const router  = require("express").Router()

router.get("/start",checkToken,start)

module.exports = router
