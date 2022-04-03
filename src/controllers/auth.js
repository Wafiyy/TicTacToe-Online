const { reject, generate} = require("../util")
const { sign } = require("../util")

require("../db")

function create(req,res){
  try {
    let {username} = req.body
    username = username.trim()
    console.log(req.body)
    if (!(/^(?=[a-zA-Z0-9._]{3,20}$)[^_.].*[^_.]$/.test(username))) {
      return reject(res, "Invalid Username")
    }
    const users = process.db.users
    const playground = process.db.playground
    const gameId = generate()
    const player = true
    users[gameId] = {
      users: [
        {
          id: 1,
          username,
          player,
          isTurn: false
        },
      ],
      gameStart: false,
    }
    playground[gameId] = ["", "", "", "", "", "", "", "", ""]
    const token = sign({id: 1, username, gameId})

    console.log(token)
    return res
        .cookie("token", token)
        .json(
            {
              ok: true,
              message: "You successfully joined the game!",
              gameId,
            }
        )
  }
  catch (e){
    return reject(res,e.message())
  }
}
module.exports = {
  create
}