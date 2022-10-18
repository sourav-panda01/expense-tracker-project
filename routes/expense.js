const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');
const authenticator = require('../middleware/authenticator')

const router = express.Router();


router.post('/addexpense',authenticator.authenticator, expenseController.addexpense)

router.get('/getexpense',authenticator.authenticator, expenseController.getexpense)


router.delete('/deleteexpense/:id',authenticator.authenticator,expenseController.deleteexpense)




module.exports = router;
