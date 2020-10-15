
let arrayArticles = [];
let mostrarSubtotal = 0;

// armado de tabla para mostrar los productos y sus valores
function showCartProductsAndTotalCost(articles) {
    let htmlContentToAppend = "";
    for (let i = 0; i < articles.length; i++) {
        htmlContentToAppend += `
        <tr>
            <td><img src='`+ articles[i].src + `' width="50px"></td>
            <td>`+ articles[i].name + `</td>
            <td>`+ articles[i].currency + " " + articles[i].unitCost + `</td>
            <td><input class="form-control article" style="width:60px;" type="number" id="productCount-${i}" value="` + articles[i].count + `" min="1"></td>
            <td><span id="productSubtotal-${i}" style="font-weight:bold;">${articles[i].currency} ${cuenta(articles)}</span></td>
        </tr>
        `
    }
    document.getElementById("cart-products").innerHTML = htmlContentToAppend;
    addEventCount();
    updateAllSubTotal();
    totalFinal();
}

//primer calculo a mostrar
function cuenta(array) {    
    array[i].unitCost * array[i].count
}

// funcion que calcula el precio del producto y cambia la moneda para sumar los subtotales
function productSubTotal(count, index) {
    let sub = 0;
    if (arrayArticles[index].currency === "UYU") {
        sub = arrayArticles[index].unitCost * count / 40;
    } else {
        sub = arrayArticles[index].unitCost * count;
    }
    return sub;
}

//fucion que actualisa el valor del sub total 
function updateAllSubTotal() {
    let subtotalArray = document.getElementsByClassName("article");
    let subtotal = 0;
    for (let i = 0; i < subtotalArray.length; i++) {
        subtotal += productSubTotal(subtotalArray[i].value, i);
    }
    document.getElementById("subT").innerHTML = "USD " + subtotal;
    mostrarSubtotal = subtotal;
}

//funcion que muestra el valor a pagar en el total
function totalFinal() {
    let total = mostrarSubtotal;
    document.getElementById("total").innerHTML = "USD " + total;
}

//funcion que activa un evento change para que el valor del sub total se modifique cuando se modifica la cantidad de articulos
function addEventCount() {
    let subtotalArray = document.getElementsByClassName("article");
    for (let i = 0; i < subtotalArray.length; i++) {
        subtotalArray[i].addEventListener("change", function () {
            document.getElementById("productSubtotal-" + i).innerHTML = arrayArticles[i].currency + " " + subtotalArray[i].value * arrayArticles[i].unitCost;
            updateAllSubTotal();
            totalFinal();
        });
    }
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === 'ok') {
            arrayArticles = resultObj.data.articles;
            showCartProductsAndTotalCost(arrayArticles);
        }
    });
})