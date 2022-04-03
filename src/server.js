const jsonErrorHandler = require("./middlewares/jsonErr");
const cookieParser = require("cookie-parser")
const { PORT } = require("../config.js")
const express =  require("express")
const router = require("./routes/")
const path = require("path");
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.use("/public",express.static(__dirname+"/public"))
app.use((req, res, next) => {
    res.render = function (fileName) {
        return res.sendFile(path.join(app.get('views'), fileName + '.html'))
    }
    return next()
})
app.use(cookieParser())
app.use(express.json())
app.use(jsonErrorHandler)
app.use(router)
app.get("/admin",(req,res) =>res.json(process.db) )


app.listen(PORT, () => console.log("server is running at "+PORT))
