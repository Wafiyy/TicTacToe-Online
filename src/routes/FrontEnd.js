const express = require("express")
const path = require("path");
const router = express.Router()

// router.set('views', path.join(__dirname, 'public'))

router.get("/",(req,res) => res.render("index"))
router.get("/login",(req,res)=> res.render("login"))
module.exports = router