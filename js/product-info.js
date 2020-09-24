
const maxRating = 5;//maximo 5 estrellas

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCategoryHTML = document.getElementById("productCategory");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            //let listAutoHTML = document.getElementById("productImagesGallery2");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCategoryHTML.innerHTML = ` <a href="category-info.html">` + product.category + `</a >`;
            productSoldCountHTML.innerHTML = product.soldCount;
            //listAutoHTML.innerHTML = product.relatedProducts;
            
            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            showRelatedProduct(product.relatedProducts);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {//llama a los comentarios guardados
        if (resultObj.status === "ok") {
            carRatinComments = resultObj.data;
            //console.log(carRatinComments);
            showRelated(carRatinComments)
        }
    });
});

function showRelatedProduct(carArray) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productList = resultObj.data;

            let htmlContentToAppend = "";

            for (let i = 0; i < carArray.length; i++) {
                let relatedPosition = carArray[i];
                let relatedProduct = productList[relatedPosition];

                htmlContentToAppend += `
                <div class="col-lg-3 col-md-4 col-6">
                    <a href="product-info.html" >
                    <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="` + relatedProduct.imgSrc + `" alt="">
                    </div>
                </div>`
            }
            document.getElementById("productImagesGallery2").innerHTML = htmlContentToAppend;
        }
    })
}


function showRelated(relatedArray) {
               let htmlRelated = "";

            for (let i = 0; i < relatedArray.length; i++) {// recorre cada comentario
                let comentarioPosition = relatedArray[i];

                let stars = "";//variable que guarda la cantidad de estrellas

                for (let i = 1; i <= maxRating; i++) {//contador de estrellas 
                    if (i <= comentarioPosition.score) {
                        stars += '<i class="fa fa-star checked"></i>';//estrellas encedidas
                    } else {
                        stars += '<i class="fa fa-star"></i>';//estrellas apagadas
                    }
                }
                //DOM que agrega la estructura de los cmentarios, junto a las estrellas
                htmlRelated += `
                                                      
                    <div id="relatedVideogameInfo" class= "row p-2">
                    <p id="nombre">`+ comentarioPosition.user + `</p> 
                       <span id:"estrellas">  ${stars}</span>
                        <hr/>
                    <p>`+ comentarioPosition.dateTime + `</p> 
                        <hr/>
                    <p id="comentario">`+ comentarioPosition.description + `</p>
                    </div>
                    <div class= "row p-2">
                    <a href="product-info.html">Ver</a>
                    </div>                     
              `
                document.getElementById("comentarios").innerHTML = htmlRelated;
                };            
};


/*
 * intenté mostrar loscomentarios nuevos, logré guasdar los datos en localStorage, pero no logré mostrarlo
function dato() { 
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const nombre = document.getElementById("menu");
    const estrellas = document.getElementById("puntuacion");
    const texto = document.getElementById("opinion");

    let comentario = Array({
        usuario: nombre.value,
        puntos: estrellas.value,
        text: texto.value,
    });
    localStorage.setItem("comentarioN", JSON.stringify(comentario));
    let comentarioGuardado = "";
   // if (resultObj.status === "ok") { ...no logré cargar correctamente los datos
        //dato = comentario.data;
    //let dato = JSON.parse(localStorage.getItem(comentario));
        comentarioGuardado =
            `<div class="col-lg-10 col-md-4 col-6 border">
            <div id="relatedVideogameInfo" class="row p-2">
                <p id="nombre">`+ comentario[0].usuario + `</p>
            <p>`+ comentario[0].puntos + `</p>
            <br />
            <p id="comentario">`+ comentario[0].text + `</p>
        </div>
            <div class="row p-2">
                <a href="product-info.html">Ver</a>
            </div>                     
                </div >`;
        document.getElementById("comentarioNuevo").innerHTML = comentarioGuardado;    

    //};  
  });
};*/