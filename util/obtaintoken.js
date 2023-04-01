const obtainTokenFromHeader = req =>{
    const headerDetails = req.headers;
   const token = headerDetails['authorization'].split(" ")[1]
   //console.log(token)
   if(token !== undefined){
    return token
   }else{
    return{status: "error", message:  "no token attached"}
   }
}

module.exports = obtainTokenFromHeader