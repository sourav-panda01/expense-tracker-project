let login=document.getElementById('b1')
login.addEventListener('click',()=>{
    let email=document.getElementById('e1').value
    let password=document.getElementById('p1').value
    axios.post("http://localhost:3000/signin",{email:email,password:password})
    .then(response=>{
        localStorage.setItem('token',response.data.token)
        window.location.href="http://127.0.0.1:5500/project/expenssetracker/views/expensetracker.html"
    })
    .catch(err=>console.log(err))

});
