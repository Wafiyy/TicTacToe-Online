require("../db")
const {reject} = require("../util");
function start(req,res){
    const gameId = req.token.gameId
    const users = process.db.users[gameId].users
    if(req.token.user.id !== 1){
        return reject(res,"You are not admin")
    }
    if(users.length < 2) return reject(res,"Not enough users")
    if(process.db.users[gameId].gameStart) return reject(res,"Game already started")
    process.db.users[gameId].gameStart = true

    users[0].isTurn = true

    res.json({
        ok:true,
        message: "Game Started"
    })
}
module.exports = start