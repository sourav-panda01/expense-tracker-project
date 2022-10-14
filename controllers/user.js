const User = require("../../expenssetracker/models/user")
const Expense = require("../../expenssetracker/models/expense")


exports.signin=(req,res)=>{
    User.findByPK(req.email)
    .then(user=>{
        Expense.findAll({where:{id : user.id}})
        .then(expense=> res.json(expense))
        .catch(err=>console.log("noresp found",err)) 
    })
    .catch(err=>console.log("user not found",err))
}


exports.signup=(req,res)=>{
    console.log("inseidde signup")
    console.log(req.body)
    const {name,email,password} = req.body
    if(name == undefined || name.length === 0 
        || email == undefined || email.length === 0
        || password == undefined || password.length === 0)
        {
            return res.status(400).json({err:'Parameters Missing'})
        }
        User.create({name,email,password})
        .then(res.status(201).json({message:'User Successfully Created'}))
        .catch(err=>res.status(500).json({message:'Something went wrong'}))    
}


// exports.signup=(req,res,next)=>{
//     console.log(req.body,"----")
//     const name=req.body.name
//     const email=req.body.email
//     const password=req.body.password
//     console.log("inside controller signup",name,email,password)
//     if(name == undefined || name.length === 0 
//         || email == undefined || email.length === 0
//         || password == undefined || password.length === 0)
//         {
//             return res.status(400).json({err:'Parameters Missing'})
//         }
//         User.create({name,email,password:hash})
//         .then(res.status(201).json({message:'User Successfully Created'}))
//         .catch(err=>res.status(500).json({message:'Something went wrong'}))
// }