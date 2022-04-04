"use strict";

let create = document.querySelector("#create");
let join = document.querySelector("#join");
let host = "";
create.addEventListener("click",async function () {
    let username = document.querySelector("#signUsername")?.value;

    let data = await fetch(host + "/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username}),
    });
    data = await data.json();
    console.log(data)
    if (!data?.ok) {
        return alert(data.message)
    }
    window.localStorage.setItem("gameId",data.gameId)
    window.location = "/"
});

join.addEventListener("click", async () => {
    let username = document.querySelector("#username").value;
    let gameId = document.querySelector("#gameId").value;

    if(!isValid(username) || gameId.length < 6) return alert("Please enter valid username or Game Id")

    const user = {
        username,
        gameId,
    };

    let data = await fetch(host + "/join", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
    });
    data = await data.json();
    if (!data?.ok) {
        return alert(data.message)
    }
    window.localStorage.setItem("gameId",data.gameId)
    window.location = "/"
});

function isValid(str) {
    return !(!str || str.length < 3 || str.length > 20);
}
