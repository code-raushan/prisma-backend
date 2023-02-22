const prisma = require('../prisma/index')

const jwt = require('jsonwebtoken')

const isLoggedIn = async(req, res, next)=>{
    try {
        const token = req.cookie.token
        if(!token){
            res.send('Please login')
            throw new Error('You are logged in')
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await prisma.user.findUnique({
            where:{
                _id: decoded.userId
            }
        })
        next()
    } catch (error) {
        throw new Error(error)
    }
}