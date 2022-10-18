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
    const parentElement = document.getElementById('listOfExpenses');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += `
        <li id=${expenseElemId}>
            ${expense.expenseamount} - ${expense.category} - ${expense.description}
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
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:3000/deleteexpense/${expenseid}`, { headers: {Authorization : token} })
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