const controller = require("../controllers/auth.js")
const { Router } = require("express")

const router = Router()

router.get("/login",controller)

module.exports = router