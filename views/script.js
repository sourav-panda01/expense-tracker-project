// let login=document.getElementById('b1')
// login.addEventListener('click',()=>{
//     axios.get("http://localhost:3000/expense")
//     .then(expense=>{
//         console.log(expense)
//         let div=document.getElementById('expense')
//         let cont=""
//         for(leti=0;i<expense.data.length;i++){
//             cont+=expense[i].data
//         }
//         div.innerHTML=cont
//     })
//     .catch(err=>console.log(err))
// })
const signup=document.getElementById('b2')
console.log(signup.value)
signup.addEventListener('click',()=>{
    let name=document.getElementById('n1').value;
    let email=document.getElementById('e2').value;
    let password=document.getElementById('p2').value
    console.log(name,email)
    axios.post('http://localhost:3000/signup',{name:name,email:email,password:password})
    .then(response=>console.log(response,"axios post response"))
    .catch(err=>console.log(err))
})