


const ORDER_ASC_BY_COST = "May. Presio";
const ORDER_DESC_BY_COST = "Men. Presio";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductArray = [];
var productFila = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;




function sortProduct(criteria, array) { 
    let result = []; 
    if (criteria === ORDER_ASC_BY_COST)  
    {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductList() {//crea div donde va a mostrar los objetos

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductArray.length; i++) {
        let procuct = currentProductArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(procuct.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(procuct.cost) <= maxCount))) {

            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action"> <!––  linea que toma los datos para el filtrado por letras ––>
                 <div class="row" data-filter-name= "` + procuct.name + `" data-filter-dat="` + procuct.description + `">
                <div class="col-3">
                    <img src="` + procuct.imgSrc + `" alt="` + procuct.name + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ procuct.name + `</h4>
                        <small class="text-muted">`+ procuct.soldCount + ` artículos</small>
                    </div>
                    <div>
                    <p> ` + procuct.description + ` </p>
                    <p> ` + procuct.currency + procuct.cost + ` </p>
                    </div>
                </div>
            </div>
            </a>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, productArray) {
    currentSortCriteria = sortCriteria;

    if (productArray != undefined) {
        currentProductArray = productArray;
    }

    currentProductArray = sortProduct(currentSortCriteria, currentProductArray);

    //Muestro las categorías ordenadas
    showProductList();
}

//filtrar productos
function filtrarProducto(productFila) {
    filterText = document.getElementById("imputFilterName").value.toUpperCase();//indica el boton que modifica el array y que va a modificar el contenido en mayusculas
    //se decidio modificar las letras a mayusculas para que no afecte el filtrado

    // recorre el array
    for (var i = 0; i < productFila.length; i += 1) {

        //si tanto el nombre como la descripcion(convertidos en mayuscula) contienen las letras indicadas en el imput, se muestra la fila que lo contenga y se oculta el resto
        if (productFila[i].dataset.filterName.toUpperCase().includes(filterText) || productFila[i].dataset.filterDat.toUpperCase().includes(filterText)) {
            productFila[i].parentNode.style.display = "block";//se muestra la sila y su estilo, para que no se rompa el diseño
        } else {
            productFila[i].parentNode.style.display = "none";//se oculta la fila y su estilo
        }
    }
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {//llama al listado de donde saca la info
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowCategories(ORDER_ASC_BY_COST, resultObj.data);
        }

        productFila = document.getElementById("cat-list-container").getElementsByClassName("row");//muestra filtro utilizando filas

    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductList();
    });

    document.getElementById("imputFilterName").addEventListener("keyup", function (){
        filtrarProducto(productFila);// si sobre el imput se escribe algo, se activa el filtro
        
    });
});
