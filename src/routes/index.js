const router  = require("express").Router()
const auth = require("./auth")
const start = require("./start")
const info = require("./info")

router.use(auth)
router.use(start)
router.use(info)

module.exports = router