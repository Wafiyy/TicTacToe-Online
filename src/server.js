const jsonErrorHandler = require("./middlewares/jsonErr");
const cookieParser = require("cookie-parser")
const { PORT } = require("../config.js")
const express =  require("express")
const router = require("./routes/")
const app = express()


app.use(cookieParser())
app.use(express.json())
app.use(jsonErrorHandler)
app.use(router)
app.get("/admin",(req,res) =>res.json(process.db) )


app.listen(PORT, () => console.log("server is running at "+PORT))
