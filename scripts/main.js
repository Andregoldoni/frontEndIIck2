// fazer login
async function login(event){
    event.preventDefault();

    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;
    
    const data ={
        email,
        password
    }
    const response = await fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/users/login',{
        method: 'POST',
        headers:{
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(data)
    }).then (function(response){
        return response.json();
    }).catch(function(erro){
        console.log(erro);
    });

    console.log(response)

    localStorage.setItem('token', response.jwt)

    window.location.href = 'tarefas.html';
}




// criar login

function criarlogin(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("passwordconfirm").value;

    console.log(firstName, lastName, email, password, password2)

    const data = {
        firstName,
        lastName,
        email,
        password,
        passwordconfirm, 
    };

    fetch ("https://ctd-fe2-todo-v2.herokuapp.com/v1/users", {
        method: "post",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(data),
    }).then (function(response){
        return response.json();
    }) .then(function(){
        window.location.href = "index.html";
    }) .catch(function(erro){
        console.log(erro);
    });
}