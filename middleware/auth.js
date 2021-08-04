const jwt =require('jsonwebtoken');

module.exports=function(req,res,next){
    const token=req.header('x-auth-token');
    console.log(token);

    if(!token){
        return res.status(401).json({msg:"no hay token"});
    }

    try{
        const cifrado=jwt.verify(token, process.env.SECRETA);
        req.usuario=cifrado.usuario;
        console.log("Usuario validado: "  +req.usuario.id);
        next();
    }catch(error){
        return res.status(401).json({msg:"Token no valido"});
    }
}