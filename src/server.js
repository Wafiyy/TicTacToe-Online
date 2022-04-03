const express =  require("express")
const { PORT } = require("../config.js")
const app = express()

app.use(express.json())

app.listen(PORT, () => console.log("server is running at "+PORT))
