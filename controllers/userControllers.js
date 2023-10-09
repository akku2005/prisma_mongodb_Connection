const prisma  =  require("../prisma/index");
const cookieToken = require("../utils/cookieToken")


//user signup
exports.signup= async(req,res,next)=>{
    try{
        const {name,email,password}= req.body
        //check
        if(!name || !email || !password){
            throw new Error ("Please Provide all details");
        }
        const user = await prisma.user.create({
            data: {
              name,
              email,
              password,
            },
          });

        //send user token
        cookieToken(user,res)
    }
    catch (error){
            throw new Error(error)
    }
}
