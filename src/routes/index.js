const router  = require("express").Router()
const auth = require("./auth")
const start = require("./start")
const info = require("./info")
const input = require("./input")

router.use(auth)
router.use(start)
router.use(info)
router.use(input)

module.exports = router