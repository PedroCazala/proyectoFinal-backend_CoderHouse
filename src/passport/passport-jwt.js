import passport from 'passport'
import {Strategy} from 'passport-jwt'
const JWTStrategy = Strategy

function sessionExtractor(req) {
    var token = null;
    if (req)
    {
        token = req.session.token
    }
    console.log('token',token);
    return token;
};
passport.use('jwt', 
    new JWTStrategy({
        secretOrKey: process.env.PRIVATE_KEY_JWT,
        jwtFromRequest: sessionExtractor
    },async (token, done)=>{
        try {
            return done(null,token.data)
        } catch (error) {
            return done('error')
        }
    })
)