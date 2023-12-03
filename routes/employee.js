const express = require('express');
const employeeRouter = express.Router();
const empModel = require('./models/Employees')
employeeRouter.use(express.json());

//get all employees
employeeRouter.get("/", async(req,res)=>{
    try{
        const employees = await empModel.find({})
        res.status(200).send(employees)
    } catch(error){
        res.status(500).send(error)
    }
});

// //create an employee
employeeRouter.post("/",async(req,res)=>{
    try{
        const emp = new empModel({
            ...req.body
        })
        await emp.save();
        res.status(200).send(emp)

    }catch(error){
        res.status(500).send(error)
    }
});

// //get employee details
employeeRouter.get("/:id",async(req,res)=>{
    try{
        const employee = await empModel.findById({_id : req.params.id})
        res.status(200).send(employee)

    }catch(error){res.status(500).send(error)}

});

// Update an employee
employeeRouter.put("/:id", async (req, res) => {
    try {
        const fields = req.body;
        const employee = await empModel.findById(req.params.id);

        if (!employee) {
            return res.status(404).send({ message: "Employee not found" });
        }
        
        await empModel.updateOne({ _id: req.params.id }, fields);
        const updatedEmployee = await empModel.findById(req.params.id);

        res.status(200).send(updatedEmployee);
    } catch (error) {
        res.status(500).send(error);
    }
});


//delete an employee
employeeRouter.delete("/:id", async(req,res)=>{
    try{
        const employee = await empModel.deleteOne({_id : req.params.id})
        if (!employee){
            res.status(404).send({ message: "Was not found"});

        }else{   
            res.status(200).send(employee)
        }
    }catch(error){res.status(500).send(error)}
});

module.exports = employeeRouter