/*

    /join[POST] todo
        * request [ username,gameId ]
        * response [ token ]
        * tasks
            * generate token
            * validate username
            * join to game
            * send response

    /create [POST] todo
        * request [ username ]
        * response [ token ]
        * tasks
            * generate token
            * validate username
            * create playground
            * send response

    /start [POST] todo
        * request [ token, gameId ]
        * response [ ok: boolean message: text ]
        * tasks
            * check token
            * check user is admin
            * check array users length equal to two
            * Set startGame
            * send response

    /info [ GET ] todo
        * request [ token,gameId ]
        * response [ users, isTurn, playground ]
        * tasks
            * check token
            * check isTurn
            * send response

    /input[ POST ] todo
        * request [ token, gameId, index ]
        * response [ ok: boolean message: text ]
        * tasks
            * check token
            * check your turn
            * validate index
            * add X/O in playground
            * check win/lose/draw
            * send response

    middlewares
        checkToken


        token
          \
          \
        == == ==
        \       \
        id      gameId

    database
        users
        playgrounds
*/