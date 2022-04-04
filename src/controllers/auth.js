const { reject, generate} = require("../util")
const { sign } = require("../util")
require("../db")

function create(req,res){
  try {
    let {username} = req.body
    username = username?.trim()
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
    process.db.game[gameId] = {
      winnerId: null,
      draw: false
    }
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
  } catch (e) {
    return reject(res, e.message)
  }
}

function join(req, res) {
  try {
    let {username, gameId} = req.body
    let users = process.db.users
    console.log(username, gameId)

    if (!(/^(?=[a-zA-Z0-9._]{3,20}$)[^_.].*[^_.]$/.test(username))) {
      return reject(res, "Invalid Username")
    }

    if (gameId && (gameId !== gameId.toLowerCase() || !users[gameId])) {
      return reject(res, "Invalid Game Id")
    }
    const user = users[gameId].users.find(el => el.username === username)
    if (user) {
      return reject(res, "User already exist")

    }
    users = users[gameId].users
    const id = users.at(-1).id + 1

    const player = id <= 2
    const isTurn = false

    const token = sign({id, username, gameId})

    users.push({
      id,
      username,
      player,
      isTurn
    })


    return res
        .cookie("token", token)
        .json({
          ok: true,
          message: "You successfully joined the game",
          gameId
        })
  } catch (e) {
    throw e
  }
}


module.exports = {
  create,
  join
}