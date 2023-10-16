var express = require('express');
var userRouter = require('./routes/user')
var employeeRouter = require('./routes/employee')

//MongoDb Connection
const mongoose = require('mongoose')
const DB_CONNECTION_STRING = "mongodb+srv://rootadmin:rootadmin@cluster0.iuldthm.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority"
mongoose.connect(DB_CONNECTION_STRING
//     , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }
);
  
const SERVER_PORT = 8086
var app = express();
var appV1 = express();
app.get("/",(req,res) =>{
    res.send("Home")
})

//Using routers
appV1.use("/user",userRouter)
appV1.use("/emp/employees",employeeRouter)
app.use("/api/v1", appV1)



app.listen(SERVER_PORT,() => {
    console.log("server has started");

})

