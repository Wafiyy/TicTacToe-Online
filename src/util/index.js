const JWT = require('jsonwebtoken') 
const SECRET_KEY = 'olma'

function reject(res,error="Error"){
  res.status(400).json({
    ok:false,
    message: error,
  })
}


module.exports = {
  sign: (payload) => JWT.sign(payload, SECRET_KEY),
  verify: (token) => JWT.verify(token, SECRET_KEY),
  reject
}
