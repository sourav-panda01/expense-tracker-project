const path = require('path');
const cors=require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Expense = require('./models/expense');
const User = require('./models/user');
const Purchase = require('./models/purchase');
const app = express();
const dotenv = require('dotenv')
dotenv.config();

app.use(bodyParser.json());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes=require('./routes/purchase')
app.use(userRoutes)

app.use(purchaseRoutes)

app.use(expenseRoutes)

app.use(errorController.get404);
User.hasMany(Expense);
User.hasMany(Purchase)
Purchase.belongsTo(User);
Expense.belongsTo(User);


sequelize
  // .sync({ force: true })
  .sync()
  .then(result=>{
    //console.log(result);
    app.listen(3000)
})
  .catch(err => {
    console.log(err);
});
