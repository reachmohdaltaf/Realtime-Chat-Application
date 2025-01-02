import jwt from 'jsonwebtoken'
export const genreateToken =(userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '7d'
    })
    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //milllisecond
        httpOnly: true, //prevent xss
        sameSite: 'Strict', // CSRF attack
        secure: process.env.NODE_ENV !== 'development'
    })

    return token
}