const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortCategories(criteria, array){ //funcion general para ordenar
    let result = []; //array que al principio va a estar vasio
    if (criteria === ORDER_ASC_BY_NAME)  //primer criterio para ordenar: alfabetico ascendente
    {
        result = array.sort(function(a, b) {// marca un sort(siempre toma tre valores, si es 1, -1 o 0). que va a organizar los datos del array
            if ( a.name < b.name ){ return -1; }//marca sia esmayor que b, toma los parametros en orden alfabetico, las mayusculas van primero, las minusculas despues
            if ( a.name > b.name ){ return 1; }//marca si a es mayor que b
            return 0;// marca si a y b son iguales
        });
    }else if (criteria === ORDER_DESC_BY_NAME){// este criterio de orden es opuesta a la anterior
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);// el numero como esta tomado como strim, necesita hacer un parseo, que pasa los strim a numero
            let bCount = parseInt(b.productCount);//pasa el estrim, a tipo numero

            if ( aCount > bCount ){ return -1; }// luego de tener los numeros guardados, da los parametros para guardarlo. a es mayor a b
            if ( aCount < bCount ){ return 1; }//a es menor a b
            return 0;// a y b son iguales
        });
    }

    return result;
}

function showCategoriesList(){//crea div donde va a mostrar los objetos

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){// pasea por cada elemento del array para crear un contenedor para cada uno
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&//establese condiciones para el orden dependiendo del numero minimo que el usuario indique, y el elemento del array que debe de conciderar
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){//lo mismo que el anterios, pero depediendo del numero maximo que indique el usuario
            //crea el contenedor
            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name +`</h4>
                            <small class="text-muted">` + category.productCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                    </div>
                </div>
            </a>
            `
        }
        //usa DOM para mostrarlo en la pagina
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){//llama a la listado de donde saca la info
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){//dependiendo de lo que el usuario indica,se utiliza DOM para mostrarlo en el orden indicado
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){// a travez del click activa el orden A-Z
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {// a travez del click activa el orden Z-A
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {// a travez del click activa el orden dependiendo de la cantidad de elementos
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){//usa Dom para preparar el orden en que va a mostrar los elementos
        document.getElementById("rangeFilterCountMin").value = "";//toma el valor minimo indicadopor el usuario
        document.getElementById("rangeFilterCountMax").value = "";//toma el valor maximo indicadopor el usuario

        minCount = undefined;//define esos valores en lugar de "undefined"
        maxCount = undefined;

        showCategoriesList();//muestra los elementos de acuerdo a lo indicado
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});
