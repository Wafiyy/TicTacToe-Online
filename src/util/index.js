const JWT = require('jsonwebtoken') 
const SECRET_KEY = 'Abror Alisherov'
const otpGenerator = require('otp-generator')

const otpOptions =  { upperCaseAlphabets: false, specialChars: false, digits:false }

function reject(res,error="Error"){
  res.status(400).json({
    ok:false,
    message: error,
  })
}

module.exports = {
  sign: (payload) => JWT.sign(payload, SECRET_KEY),
  verify: (token) => JWT.verify(token, SECRET_KEY),
  generate: () => otpGenerator.generate(6, otpOptions),
  reject
}
