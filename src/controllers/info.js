
function info(req,res){
    const gameId = req.token.gameId
    const users = process.db.users[gameId].users
    const user = req.token.user
    let turnUser = users.find(el => el.isTurn && el.player) || null
    let playground = process.db.playground[gameId]

    res.json({
        ok:true,
        message: "OK",
        users,
        user,
        currentUser: turnUser,
        playground,
        game: process.db.game[gameId]
    })
}
module.exports = info