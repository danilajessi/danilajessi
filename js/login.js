//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

/*
document.addEventListener("DOMContentLoaded", function(e){

 

    function guardar(nombre) {
        localStorage.setItem("Usuario", nombre.trim());
        location.href = "index.html";
    }

   
}); */

const form = document.getElementById("form");
const name = document.getElementById("usuario");

form.addEventListener("submit", function (event) {
    event.preventDefault();//detiene lapagina para que no se vuelva a cargar
    let usuario = Array({
        usuario: name.value// Crea un JSON que guarda el nombre del usuario 
    });
    localStorage.setItem("usuario", JSON.stringify(usuario));// Guarda como JSON los datos ingresados por el usuario
    location.href = "home.html";//indica ruta hacia donde tiene que llevar el boton
});