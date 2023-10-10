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


//for login user

exports.login= async(req,res,next)=>{
  try{
    //take info from user
    const{name,email,password}= req.body;
    if( !email || !password){
      throw new Error("please provide email and password");

    }
//find a user based on email
const user = await prisma.use.findUnique({
  where:{
    email
  }
})
//whwn there is no user

if(!user){
  throw new Error("user not found");
}
//password mismatch
if(user.password!== password){
  throw new Error("password is incorrect");
}
//user is there and validation

cookieToken(user,req);
  }catch(error){
    throw new Error(err);
  }
}

//logiut user

exports.logout = async (req,res,next)=>{
  try{
    res.clearCookie("token");
    res.json({
      success :true
    })

  }catch(error){
    throw new Error(error)
  }
}