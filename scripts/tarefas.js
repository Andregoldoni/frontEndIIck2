

window.onload = () => {
    getUser();
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