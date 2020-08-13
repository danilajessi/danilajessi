

//contenedor para los productos
var categoriesArray = [];

function showCategoriesList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.name + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name +`</h4>
                        <small class="text-muted">`+ category.soldCount + ` artículos</small>
                    </div>
                    <div>
                    <p> ` + category.description + ` </p>
                    <p> ` + category.currency + category.cost + ` </p>
                    </div>
                </div>
            </div>
        </div>
        `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

//llamando a la fumción al fetch para mostrar daatos

document.addEventListener("DOMContentLoaded", function(resultObj){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
        }
    });
});
