// bring in prisma and cookie
const prisma = require('../prisma/index')

const cookieToken = require('../utils/cookieToken')

// user signup

exports.signup = async(req, res, next)=>{
    try {
        const {name, email, password}=req.body
        //check
        if(!name || !email || !password){
            throw new Error('please provide all fields')
        }
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password
            }
        })
        //send user a token
        cookieToken(user, res)
        
    } catch (error) {
        
    }
}