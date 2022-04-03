require("./../db")
const {reject} = require("./index");
function checkWinner(gameId,id){
    try {
        const board = process.db.playground[gameId]
        if (
            board[1 - 1] && board[1 - 1] === board[2 - 1] && board[2 - 1] === board[3 - 1] ||
            board[4 - 1] && board[4 - 1] === board[5 - 1] && board[5 - 1] === board[6 - 1] ||
            board[7 - 1] && board[7 - 1] === board[8 - 1] && board[8 - 1] === board[9 - 1] ||
            board[1 - 1] && board[1 - 1] === board[4 - 1] && board[4 - 1] === board[7 - 1] ||
            board[2 - 1] && board[2 - 1] === board[5 - 1] && board[5 - 1] === board[8 - 1] ||
            board[3 - 1] && board[3 - 1] === board[6 - 1] && board[6 - 1] === board[9 - 1] ||
            board[7 - 1] && board[7 - 1] === board[5 - 1] && board[5 - 1] === board[3 - 1] ||
            board[1 - 1] && board[1 - 1] === board[5 - 1] && board[5 - 1] === board[9 - 1]
        ) {
            process.db.game[gameId].winnerId = id
            console.log(process.db.game[gameId].winnerId)
            process.db.users[gameId].users.map(el => {
                el.player = false
                el.isTurn = false
                return el
            })
            return ""
        }
        if (!board.includes("")) {
            process.db.game[gameId].draw = true
            return ""
        }
    }catch (e){
        throw e
    }
}
module.exports = checkWinner