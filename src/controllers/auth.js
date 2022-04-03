const { reject } = require("../util")

function create(req,res){
  const { username } = req.body
  
  if(!(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(username))){
    reject(res,"Invalid Username")
  }
  

}
