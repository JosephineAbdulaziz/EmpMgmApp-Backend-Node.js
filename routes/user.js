const express = require('express');
const userRouter = express.Router();
const userModel = require('./models/Users')
userRouter.use(express.json());

//Create New Account
userRouter.post("/signup",async(req,res)=>{
    try{
        const user = new userModel({
            ...req.body
        })
        await user.save();
        res.status(200).send(user)

    }catch(error){
        res.status(500).send(error)
    }
});

//Log in
userRouter.post("/login", async (req, res) => {
    try {
        const reqbody = req.body;
        console.log(reqbody);
        console.log(reqbody.username);

        const user = await userModel.findOne({ username: reqbody.username });

        if (user) {
            if (user.password === reqbody.password) {
                res.status(200).send({ status: true, username: user.username, message: "User logged in successfully" });
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