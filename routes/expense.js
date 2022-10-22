const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');
const authenticator = require('../middleware/authenticator')

const router = express.Router();


router.post('/addexpense',authenticator.authenticator, expenseController.addexpense)

router.get('/getexpense',authenticator.authenticator, expenseController.getexpense)

router.post('/deleteexpense/:id',authenticator.authenticator, expenseController.deleteexpense)


router.get('/getallusers', expenseController.showallUserPremium)

router.get('/getallexpense/:id', expenseController.seeExpenseOfUser)



module.exports = router;
