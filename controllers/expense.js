const User = require("../models/user");
const Expense = require("../models/expense");

exports.getexpense=(req,res)=>{
//     console.log('in getexpense',req.user)
    Expense.findAll({where:{userId :req.user.id }})
    .then(expenses=>{
        res.status(200).json(expenses)
    })
    .catch(err=>{
        res.status(500).json({err,success:false})
    })
}




exports.addexpense = (req, res) => {
    console.log('in addexpense',req.body)
    const { amount, description, category } = req.body;
    Expense.create({ amount, description, category,userId:req.user.id }).then(expense => {
        return res.status(201).json({expense, success: true } );
    }).catch(err => {
        return res.status(403).json({success : false, error: err})
    })
}




exports.deleteexpense = (req,res,next)=>{
    console.log("inside delete expense controller")
    console.log(req.params,"---")
    const expenseid = req.params.id;
    
    Expense.destroy({where: { id: expenseid }}).then(() => {
        res.status(204).json({ success: true, message: "Deleted Successfuly"})
    }).catch(err => {
        console.log(err);
        return res.status(403).json({ success: true, message: "Failed"})
    })
}



exports.showallUserPremium=(req,res,next)=>{
    User.findAll()
    .then(users=>{
        console.log("Inside get show all")
        res.status(200).json({users,success:true})
    })
}
  
  
exports.seeExpenseOfUser = (req,res,next)=>{
    const id =  req.params.id
    Expense.findAll({where:{userId:id}})
    .then(users=>{
    res.status(200).json({users,success:true})
    })
}
