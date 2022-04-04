const statusDisplay = document.querySelector(".game--status");
const displayId = document.querySelector("#gameId")
let gameActive = true;
let currentPlayer = "X";
let startGame = document.querySelector(".game--restart")
const buttons = document.querySelectorAll(".cell")

const winningMessage = (user) => `Player ${user} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = (user) => `It's ${user}'s turn`;

const gameId = window.localStorage.gameId
window.addEventListener("DOMContentLoaded",async () => {

  if(!gameId){
    return window.location = "/login"
  }
  displayId.textContent = gameId
  displayId.addEventListener("click",() => {
    navigator.clipboard.writeText(displayId.textContent);
    return alert("Copied "+displayId.textContent)
  })

  setInterval(async () => {
    let info = await fetch("/info")
    info = await info.json()
    if(!info.ok) return window.location = "/login"
    let board = info.playground
    renderBoard(board)
    renderUsers(info.users)
    if(info.user.id === 1) startGame.style.removeProperty("display")

    buttons.forEach(el =>{
      el.onclick = async function () {
        if (info.user.id !== info.currentUser?.id) return
        let index = +el.getAttribute("data-cell-index")
        if (index !== 0 && !index) return

        let response = await fetch("/input", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({index}),
        })
        response = await response.json()
        if(!response.ok){
          return alert(response.message)
        }
      }
      if(!info.game.winnerId && !info.game.draw){
        currentUser(info.currentUser)
      }
      if(info.game.winnerId && !info.game.draw){
        let winner = info.users.find(el => el.id === info.game.winnerId)
        statusDisplay.innerHTML = winningMessage(winner.username)
        setTimeout(() => window.location = "/login",5000)
      }
      if(info.game.draw){
        statusDisplay.innerHTML = drawMessage()
        setTimeout(() => window.location = "/login",5000)
      }
    })
  },500)

  startGame.addEventListener("click",async () => {
    let response = await fetch("/start")
    response = await response.json()

    if(!response.ok){
      return alert(response.message)
    }
    startGame.style.display = null
    alert(response.message)
  })
})

function renderUsers(peoples){
  const users = document.querySelector("#users")
  users.innerHTML = ""
  for (let people of peoples) {
    users.innerHTML+=`
    <tr>
       <th scope="row">${people.id}</th>
       <td>${people.username}</td>
       <td>${people.player}</td>
       <td>${people.isTurn}</td>
    </tr>
  `
  }
}

function currentUser(user){
  if(!user) return

  statusDisplay.innerHTML = currentPlayerTurn(user.username)
}

function renderBoard(board){
  for (let i=0; i < buttons.length; i++){
    buttons[i].textContent = board[i]
  }
}