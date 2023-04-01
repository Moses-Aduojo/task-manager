 const obtainTokenFromHeader = require("../util/obtaintoken");
 const verifyToken = require("../util/verifytoken");

 const isLogin = (req,res,next)=>{
     const token = obtainTokenFromHeader(req);
     const userDecoded = verifyToken(token);
     req.userAuth = userDecoded.id
     //console.log(req.userAuth)
     if(!userDecoded){
         return res.json({
             status: "error",
             message: "invalid token"
         })
     }else{
         next()
     }
 }

 module.exports = isLogin
