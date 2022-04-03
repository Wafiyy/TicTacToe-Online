const express =  require("express")
const { PORT } = require("../config.js")
const cookieParser = require("cookie-parser")
const auth = require("./routes/auth")
const app = express()


app.use(cookieParser())
app.use(express.json())
const jsonErrorHandler = async (err, req, res,next) => {
    res.status(400).json(
        {
            ok:false,
            message: err.message
        });
}
app.use(jsonErrorHandler)
app.use(auth)



app.listen(PORT, () => console.log("server is running at "+PORT))
