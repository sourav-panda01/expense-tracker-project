const User = require('../models/user.js')
const bcrypt = require('bcrypt')

const token = require('jsonwebtoken')

exports.signup = (req,res,next)=>{
    const {name,email,password} = req.body
    if(name == undefined || name.length === 0 
        || email == undefined || email.length === 0
        || password == undefined || password.length === 0)
        {
            return res.status(400).json({err:'Parameters Missing'})
        }
        User.findAll()
        .then(users=>{
            return bcrypt.hash(password, 10 )
        })
        .then(hash=>{
            return User.create({name,email,password:hash})
        })
        .then(user=>{
            res.status(201).json({message:'User Successfully Created'})
        })
        .catch(err=>res.status(500).json({err:'Something Went wrong in outer catch'}))
}

function generateToken(id) {
    return token.sign({userId:id}, 'secretkey')
}

// function generateToken(id) {
//     return jwt.sign(id ,process.env.TOKEN_SECRET);
// }
exports.signin=(req,res,next) =>{
    const{email,password} = req.body
    if(email == undefined || email.length === 0
        || password == undefined || password.length === 0)
        {
            return res.status(400).json({err:'Email Id or Password Missing',success:false})
        }
        User.findAll({where:{email:email}})
        .then(user=>{
            console.log("insie signin controller")
            if(user.length>0){
                bcrypt.compare(password, user[0].password, (err,result)=>{
                    if(err) {
                        return res.status(400).json({message:'Something went wrong'})
                    }
                    if(result === true){
                        return res.status(200).json({message:'Successfully logged in', success:true, token:generateToken(user[0].id)})
                    } else {
                        return res.status(400).json({message: 'Password did not match', success:false})
                    }
                })
               
            } else {
                return res.status(404).json({message:'User does not exist'})
            }
        })

        .catch(err=>{
            res.status(500).json({message:err, success:false})
        })
}


// const User = require("../../expenssetracker/models/user")
// const Expense = require("../../expenssetracker/models/expense")


// exports.signin=(req,res)=>{
//     console.log("entering signin")
//     User.findAll({where:{email:req.body.email}})
//     .then(user=>{
//         if(user[0].password===req.body.password){
//             res.status(201).json({message:'User Login Successfull'})
//         }
//         else{
//             res.status(401).json({message:'Password not correct'})
//         }
//         res.redirect("http://127.0.0.1:5500/project/expenssetracker/views/expensetracker.html")
//         console.log(user[0].name,user[0].email,user[0].password)
//     })
//     .catch(err=>res.status(404).json({message:' User not exist'}))
    // User.findByPK(req.email)
    // .then(user=>{
    //     Expense.findAll({where:{id : user.id}})
    //     .then(expense=> res.json(expense))
    //     .catch(err=>console.log("noresp found",err)) 
    // })
    // .catch(err=>console.log("user not found",err))
// }


// exports.signup=(req,res)=>{
//     console.log("inseidde signup")
//     console.log(req.body)
//     const {name,email,password} = req.body
//     if(name == undefined || name.length === 0 
//         || email == undefined || email.length === 0
//         || password == undefined || password.length === 0)
//         {
//             return res.status(400).json({err:'Parameters Missing'})
//         }
//         User.create({name,email,password})
//         .then(res.status(201).json({message:'User Successfully Created'}))
//         .catch(err=>res.status(500).json({message:'Something went wrong'}))    
// }


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