import jwt from 'jsonwebtoken'
export const generateToken = (user)=>{
    const token = jwt.sign({data:user},process.env.PRIVATE_KEY_JWT, {expiresIn: '1m'} )
    return token
}
