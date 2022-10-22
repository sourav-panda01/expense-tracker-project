const Razor_pay = require("razorpay");

const Purchase = require("../models/purchase");

exports.purchasePremium = async (req, res, next) => {
  console.log("inside purchase premium sadsadasd===-=----")
  console.log(req,"----this is req")
  try {
    //console.log('Expense Tarcker',purchase.id)
    var instance = new Razor_pay({
      key_id: process.env.Key_Id,
      key_secret: process.env.Key_Secret,
    });
    const amount = 2500;
    console.log("hadbugihigsuicjspcdjn");
    instance.orders.create(
      {
        amount,
        currency: "INR",
      },
    (error, purchase) => {
      console.log(purchase)
      if (error) {
        throw new Error(error,"error in purchase");
    }
        Purchase.create({ purchaseid: purchase.id, status: "PENDING" ,userId:req.user.id})
          .then(() => {
            return res.status(201).json({ purchase, key_id: instance.key_id });
          })
          .catch((error) => {
            throw new Error(error);
          });
      }
    );
    console.log('Hiiiiiiiiiiiiii')
  } catch (error) {
    return res.status(403).json({ message: "Something Went wrong", error });
  }
};



exports.updateStatus = (req, res, next) => {
  try {
    console.log(req.body)
    const { paymentId, purchaseId } = req.body;
    Purchase.findOne({ where: { purchaseid: purchaseId } })
      .then((order) => {
        order
          .update({ paymentid: paymentId, status: "SUCCESSFULL" })
          .then(() => {
            req.user.update({ isPremium: true });
            return res
              .status(202)
              .json({ sucess: true, message: "Transaction Successful" });
              
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {
    return res.status(403).json({ message: "Something Went wrong", error });
  }
};