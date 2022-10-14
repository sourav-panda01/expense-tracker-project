const User = require("../models/user");
const Expense = require("../models/expense");

exports.deleteexpense = (req,res,next)=>{
    Expense.findByPk()

}

exports.getexpense=(res,req)=>{
    Expense.findAll({where:{userId:req.id}})
    .then(response=>{
        res.status(200).json({response,success:true})
      }).catch(err=>{res.status(500).json(err)})
}

exports.postexpense=(res,req)=>{
    Expense.create()
    .then()
    .catch()

}