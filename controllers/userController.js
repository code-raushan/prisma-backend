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
        console.log(error.message);
    }
}
//login user
exports.login = async (req, res, next)=>{
    try {
        const {email, password}=req.body;
        if(!email || !password){
            throw new Error('Please provide email and password')
        }
        //find the user with the email 
        const user = prisma.user.findUnique({
            where:{
                email
            }
        })
        // if user doesn't exist
        if(!user){
            throw new Error('User not found')
        }
        //password mismatch
        if(user.password !== password){
            throw new Error('password is incorrect')
        }
        cookieToken(user, res)

    } catch (error) {
        throw new Error(error)
    }
}