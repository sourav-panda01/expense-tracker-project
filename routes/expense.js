const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();


router.delete('/user', expenseController.deleteexpense);

router.get('/user',expenseController.getexpense);
router.post('/user',expenseController.postexpense);



module.exports = router;
