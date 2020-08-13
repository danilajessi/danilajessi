//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const container = document.getElementById('container');

  signUpButton.addEventListener('click', () => {
  	container.classList.add("right-panel-active");
  });

  signInButton.addEventListener('click', () => {
  	container.classList.remove("right-panel-active");
  });

});
