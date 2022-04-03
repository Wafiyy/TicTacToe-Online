const { verify, reject} = require("../util")
require("../db")
function start(req,res,next){
  try {

    const {token} = req.cookies
    const {id, username, gameId} = verify(token)
    let users = process.db.users
    console.log(users[gameId])
    if (!users[gameId]) {
      return reject(res, "Invalid gameId")
    }
    let user = users[gameId].users.find(el => el.id === id && el.username === username)
    if (!user) {
      return reject("Invalid id or username")
    }
    return next()
  }
  catch (e){
    return reject(res,e.message)
  }
}
module.exports = start
