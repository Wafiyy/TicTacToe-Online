const controller = require("../controllers/auth.js")
const { Router } = require("express")

const router = Router()

router.post("/create", controller.create)
router.post("/join", controller.join)

module.exports = router