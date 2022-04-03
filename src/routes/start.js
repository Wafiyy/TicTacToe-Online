const middleware = require("../middlewares/start")
const router  = require("express").Router()

router.get("/start",middleware)

module.exports = router
