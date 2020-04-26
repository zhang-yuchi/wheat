const jwt = require('jsonwebtoken')
const {security} = require('../config/config')
const generateToken = function(uid,scope){
  const token = jwt.sign({
    uid,scope
  },security.secretKey,{expiresIn:security.expiresIn})
  return token
}
module.exports = {
  generateToken
}