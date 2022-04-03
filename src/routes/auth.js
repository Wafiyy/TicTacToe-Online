const controller = require("../controllers/auth.js")
const { Router } = require("express")

const router = Router()

router.post("/create",controller.create)

module.exports = router