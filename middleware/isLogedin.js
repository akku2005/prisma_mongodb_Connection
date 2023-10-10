const prisma = require('../prisma/index')

const jwt = require('jsonwebtoken')

const isLOggedIn = async (req,res,next)=>{
    try{
        const token = req.cookie.token
        if(!token){
            res.send("please login")
            throw new Error("You are not Logged in")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await prisma.user.findUnique({
            where:{
                id:decoded.userId
            }
    
        })
        next()
    }catch(error){
        throw new Error(error)
    }
}

