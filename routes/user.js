const express = require('express');
const userRouter = express.Router();
const userModel = require('./models/Users')
userRouter.use(express.json());

//Create New Account
// userRouter.post("/signup",async(req,res)=>{
//     try{
//         const user = new userModel({
//             ...req.body
//         })
//         await user.save();
//         res.status(200).send(user)

//     }catch(error){
//         res.status(500).send(error)
//     }
// });
//Create New Account
userRouter.post("/signup", async (req, res) => {
    try {
      const existingUser = await userModel.findOne({ email: req.body.email });
  
      if (existingUser) {
        return res.status(400).send({ message: "Email already exists" });
      }
  
      const newUser = new userModel({
        ...req.body
      });
  
      await newUser.save();
      res.status(200).send(newUser);
    } catch (error) {
      res.status(500).send(error);
    }
  });

//Log in
userRouter.post("/login", async (req, res) => {
    try {
        const reqbody = req.body;
        console.log(reqbody);
        console.log(reqbody.email);

        const user = await userModel.findOne({ email: reqbody.email });

        if (user) {
            if (user.password === reqbody.password) {
                res.status(200).send({ status: true, email: user.email, message: "User logged in successfully" });
            } else {
                res.status(404).send({ status: false, message: "Invalid username and password" });
            }
        } else {
            res.status(404).send({ status: false, message: "Invalid username and password" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = userRouter