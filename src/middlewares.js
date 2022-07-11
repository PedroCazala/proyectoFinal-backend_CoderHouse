const admin =true
export const adminPermission =(req,res,next)=>{
    admin ?
        next()
    :
        res.send('Se necesitan permisos de administrador')
}