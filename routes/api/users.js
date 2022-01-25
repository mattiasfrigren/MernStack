const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//item model
const User = require('../../models/User');

//@route POST api/users
//@desc register new user
//@access Public
router.post('/', (req,res) =>{
   const {name,email,password} = req.body;

   if(!name || !email || !password){
       return res.status(400).json({msg:"please entre all fields"});
   }
   //check for existing user
   User.findOne({email})
   .then(user => {
       if(user) return res.status(400).json({msg: "User aldready exists"});

       const newUser = new User({ email,name, password});
       
       //Create salt & hash
       bcrypt.hash(newUser.password, 10)
       .then( hash =>{

           newUser.password = hash;
           newUser.save()
           .then( user => {
               jwt.sign(
                   {id: user.id},
                   config.get('jwtSecret'),
                   {expiresIn: 3600},
                   (err, token) =>{
                       if(err) throw err;

                       res.status(201).json( { token, user :{
                        id : user.id,
                        name :user.name,
                        email:user.email
                    }
     
                 })
                } 
               )
              
           })
       })

   })


});




module.exports = router;