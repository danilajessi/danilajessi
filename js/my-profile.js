

const form = document.getElementById("for");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const edad = document.getElementById("edad");
const telefono = document.getElementById("telefono");

form.addEventListener("submit", function (event) {
    event.preventDefault();//detiene lapagina para que no se vuelva a cargar
    let users = Array({
        usuario: nombre.value,// Crea un JSON que guarda los datos del usuario 
        apellido: apellido.value, 
        edad: edad.value,
        telefono: telefono.value
    });
    localStorage.setItem("user", JSON.stringify(users));// Guarda como JSON los datos ingresados por el usuario
    location.href = "my-profile.html";//indica ruta hacia donde tiene que llevar el boton
});



function datos() {
    let nombreGuardado = JSON.parse(localStorage.getItem("user"));// vuelve texto el JSON que contiene el nombre del usuario
    if (nombreGuardado != null) {
        form.innerHTML = `
                <div class="row control">
                <div class="col-md-5 mb-4 col-sm-12">
                    <label for="nombres">Nombres:</label>
                    <input id="nombre" type="text" class="form-control" placeholder="`+ nombreGuardado[0].usuario +`" name="nombre" required >
                </div>
                <div class="col-md-5 mb-4 col-sm-12">
                    <label for="apellido">Apellidos:</label>
                    <input id="apellido" type="text" class="form-control" placeholder="`+ nombreGuardado[0].apellido +`" name="apellido" required>
                </div>
                <div class="col-md-5 mb-4 col-sm-12">
                    <label for="edad">Edad:</label>
                    <input id="edad" type="number" class="form-control" placeholder="`+ nombreGuardado[0].edad +`" name="edad" required>
                </div>
                <div class="col-md-5 mb-4 col-sm-12">
                    <label for="telefono">Telefono de contacto:</label>
                    <input id="telefono" type="number" class="form-control" placeholder="`+ nombreGuardado[0].telefono +`" name="telefono" required>
                </div>
                </div>
                <button class="btn btn-primary" type="submit" onclick="datos()">Guardar</button>
                `;
    };   
}




const imgBot = document.getElementById("imgBot");//llamado a boton
const imagen = document.getElementById("imagen");//guarda linck introducido por usuario

imgBot.addEventListener("click", function (event) {//evento llamado por el boton
    event.preventDefault();
    let JSONimagen = Array({
        imagenDePerfil: imagen.value// Crea el JSON que guarda la imagen
    });
    localStorage.setItem("imagenDePerfil", JSON.stringify(JSONimagen));// Guarda como JSON los datos ingresados por el usuario
    //location.href = "my-profile.html";//indica ruta hacia donde tiene que llevar el boton
});


function subirFoto() {
    let imgGuardado = JSON.parse(localStorage.getItem("imagenDePerfil"));// vuelve texto el JSON que contiene el nombre del usuario
    if (imgGuardado != null) {
        let insertarImg = `<img src="` + imgGuardado[0].imagenDePerfil + `" width="200px" alt= "fotoDePerfil">`
        document.getElementById("mostrarImagen").innerHTML = insertarImg;
    };
}
