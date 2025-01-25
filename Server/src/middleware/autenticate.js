const isAutenticated = (req,res,next) =>{
    console.log(req.session.usuario)
    if(req.session.usuario){
        return next()
    }
    res.status(403).json({message:"tienes que iniciar sesión"})

}

const isAdmin = (req,res,next) =>{
    console.log("🔍 Verificando rol de administrador:", req.session.usuario);
    
    if(!req.session.usuario){
       return res.status(403).json({message:"tienes que iniciar sesión"})
    }
    if(req.session.usuario.rol === "admin"){
       return next()

    }
    res.status(403).json({message:"no eres admin para acceder"})
}

module.exports = {isAutenticated, isAdmin}
