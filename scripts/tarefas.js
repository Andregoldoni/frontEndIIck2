const url = 'https://ctd-fe2-todo-v2.herokuapp.com/v1'

window.onload = () => {
  getUser();

  const createTaskForm = document.getElementById('submitButton')
  const inputTarefa = document.getElementById('novaTarefa')
  const cancelButton = document.querySelector('.cancel-button')

  createTaskForm.addEventListener('click', (evento) => {
    evento.preventDefault()
    // createTasks(inputTarefa.value);
  })

  // funcao carregar tarefa
  carregarTarefas()
};

function carregarTarefas (){
  fetch(`${url}/tasks`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem("token")}`,
    },
  })
    .then(response => response.json())
    .then((tarefas) => {
        // fazer um for para chamar varias vezes o add tarefa ()

        tarefas.forEach(addTarefa);
       
      console.log(tarefas);

    })
    .catch(error => console.log(error))
};


// pegar informações do usuario
function getUser() {
    fetch("https://ctd-fe2-todo-v2.herokuapp.com/v1/users/getMe", {
      method: "get",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        localStorage.setItem("usuario", JSON.stringify(data));

        const usuario = JSON.parse(localStorage.getItem("usuario"));

        console.log(usuario)
  
        document.getElementById(
          "informacaoUser"
        ).textContent = `${usuario.firstName} ${usuario.lastName}`;
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function closeApp(event) {
    event.preventDefault();

    const logout = document.getElementById('closeApp');
    localStorage.removeItem('token');
    location.href = '../../index.html';
  }

  function addTarefa(){


  }

const createTasks = (description) => {

  const newTask = {
    description: description,
    completed: false
  }

  fetch(`${url}/tasks`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(newTask)
  })
    .then(response => response.json())
    .then((taskJson) => {
      // inputDescricaoTarefa.value = '';
      addTarefa(taskJson)
      console.log(taskJson);
      // renderModal(data);
      // getTasks()
    })
    .catch(error => console.log(error))
}



// add tarefa na lista

function addTarefa(taskJson) {
  const listaTarefas = document.getElementById('listaTarefas')
  listaTarefas.innerHTML += `
      <li class="tarefa">
        <div class="not-done" id="notdone"></div>
        <div class="descricao">
          <p class="nome">${taskJson.description}</p>
          <p class="timestamp">Criada em: ${taskJson.createdAt}</p>
        </div>
      </li>
  `
  const inputTarefa = document.getElementById('novaTarefa')
  inputTarefa.value = ''
}

document.getElementById('submitButton').addEventListener('click', ()=>{
  createTasks(document.getElementById('novaTarefa').value)
})



//completar tarefa








