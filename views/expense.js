window.addEventListener('DOMContentLoaded', ()=> {
    const token = localStorage.getItem('token');
    console.log("inside expense.js get")
    axios.get('http://localhost:3000/getexpense', { headers: {Authorization: token} })
    .then(response => {
        if(response.status === 200){
            response.data.forEach(expense => {
            showexpense(expense);
            })
        }
    })
    .catch(err=>console.log(err))
});

function showexpense(expense){
  const parentElement = document.getElementById('expense');
  const expenseElemId = `expense-${expense.id}`;
  parentElement.innerHTML += `
      <li id=${expenseElemId}>
          ${expense.amount} - ${expense.category} - ${expense.description}
          <button onclick='deleteExpense(event, ${expense.id})'>
          Delete Expense
          </button>
</li>`
}



function addExpense(e){
    e.preventDefault();
    console.log("inside add expense function in script")
    let expenseDetails = {
        amount: document.getElementById("amount").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
    };
    const token = localStorage.getItem('token');
    console.log(expenseDetails)
    axios.post('http://localhost:3000/addexpense',expenseDetails, { headers: {Authorization: token} })
    .then((response) => {

    if(response.status === 201){
        showexpense(response.data.expense);
    } else {
        throw new Error('Failed To create new expense');
    }
    }).catch(err => showError(err))
}
function deleteExpense(e, expenseid) {
  console.log(expenseid,"this is expense id in front end")
    const token =localStorage.getItem('token');
    console.log(token)
    let url=`http://localhost:3000/deleteexpense/${expenseid}`
    let config={
      headers: {Authorization: token}
    }
    console.log(config,"this is config")
    axios.post(url,{},config)
    .then((response) => {
    if(response.status === 204){
            const expenseElemId = `expense-${expenseid}`;
            document.getElementById(expenseElemId).remove();
        } else {
            throw new Error('Failed to delete');
        }
    }).catch((err => {
        document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
    }))
}





const URLTOBACKEND = "http://localhost:3000/";
const EMAILID = "suravpanda601@gmail.com";
const PHONENO = 7008527298;
async function gopremium(event) {
  const token = localStorage.getItem("token");
  event.preventDefault();
  const response = await axios.get("http://localhost:3000/premium", {
    headers: { Authorization: token },
  });
  //console.log(response)
  var options = {
    key: response.data.key_id,
    name: "Sourav Kumar Panda",
    order_id: response.data.purchase.id,
    prefill: {
      name: "Sourav Kumar Panda",
      email: `${EMAILID}`,
      contact: `${PHONENO}`,
    },
    theme: {
      color: "#3399cc",
    },

    handler: function (response) {
      console.log(response,"sadsadasd");
      axios
        .post(
          'http://localhost:3000/updatestatus',
          {
            purchaseId: options.order_id,
            paymentId: response.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        )
        .then(() => {
          alert("You are a Premium User Now");
          window.location.href="http://127.0.0.1:5500/project/expenssetracker/views/premiumuser.html"

          document.querySelector(".nav").classList.add("premium");
          document.querySelector(".wrapper").classList.add("premium");
          document.querySelector(".footer").classList.add("premium");
          let nav = document.getElementById("nav");
          let btn = document.createElement("button");
          nav.append(btn);
          document.querySelector("#premiumbtn").remove();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  };

  const rzp1 = new Razorpay(options);
  rzp1.open();

  rzp1.on("payment.failed", function (response) {
    // alert(response.error.code);
    // alert(response.error.description);

    console.log(response);
  });
}