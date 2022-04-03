const {reject} = require("../util");
const checkWinner = require("../util/checkwinner");

function input(req,res){
    try {
        const {index} = req.body
        const gameId = req.token.gameId
        const user = req.token.user
        const playground = process.db.playground[gameId]
        const users = process.db.users[gameId].users

        if(!user.player) return reject(res,"Not Allowed")
        if (!user.isTurn) return reject(res, "Now it's not your turn")
        console.log(index < 0, index > 8, playground[+index],index)
        if (index < 0 || index > 8 || playground[index] !== "") return reject(res,"This place not empty")

        playground[index] = user.id === 1 ? "X" : "O"
        user.isTurn = false
        if (user.id === 1) {
            users[0].isTurn = false
            users[1].isTurn = true
        } else {
            users[1].isTurn = false
            users[0].isTurn = true
        }
        checkWinner(gameId,user.id)
        return res.json({
            ok: true,
            message: 'OK'
        })
    }catch (e) {
        return reject(res,e)
    }
}
module.exports = input