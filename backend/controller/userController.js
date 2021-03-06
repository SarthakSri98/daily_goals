var mongoose = require("mongoose");
var User = require("../model/userModel");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.login = function(req,res,next){

  User.findOne({ email:req.body.email }).then(user=>{

      let fetchedUser;

      if(!user)
      return res.status(401).json({
          message:"authentication failed",
          isAuthenticated:false
      })
     return bcrypt.compare(req.body.password,user.password)
    }).then((result)=>{
       if(!result)
       {
        return res.status(401).json({
            message:"authentication failed",
            isAuthenticated:false

        })
       }
       const token = jwt.sign({
         email: req.body.email
       }, "the_good_the_bad_and_the_uchihas", {
         expiresIn: "1h",
       });
       res.status(200).json({
           result:result,
           message:"User authenticated successfully",
           token : token,
           isAuthenticated:true
       })
    }).catch((err)=>{
        res.status(401).json({
            message:"Authentication failed",
            error:err,
            isAuthenticated:false
        })
    })
  

}


exports.signup = function(req,res,next){
    console.log(res.body);   
    bcrypt.hash(req.body.password,10)
    .then(hash => {
    const user = new User({
          email : req.body.email,
          password : hash
      })
    
    
    user.save().then(result=>{
        res.status(200).json({
            result:result,
            message:"New profile created succesfully"
        })
    }).catch((error)=>{
        res.status(404).json({
            message:"There was an error :"+error
        })
    })
})
}