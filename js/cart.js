
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
            <td><span id="productSubtotal-${i}" style="font-weight:bold;">${articles[i].currency} ${articles[i].unitCost * articles[i].count}</span></td>
        </tr>
        `
    }
    document.getElementById("cart-products").innerHTML = htmlContentToAppend;
    addEventCount();
    updateAllSubTotal();
    totalFinal();
    //envio(mostrarSubtotal);
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

//funciones que actualizan el valor a pagar dependiendo del envio, reaccionan al onclick que tienen los respectivos botones
function envio1() {
    let subtotal = [];
        subtotal = mostrarSubtotal * 1.15;
   document.getElementById("subT").innerHTML = "USD " + subtotal;
   document.getElementById("total").innerHTML = "USD " + subtotal;
}
function envio2() {
    let subtotal = [];
    subtotal = mostrarSubtotal * 1.07;
    document.getElementById("subT").innerHTML = "USD " + subtotal;
    document.getElementById("total").innerHTML = "USD " + subtotal;
}
function envio3() {
    let subtotal = [];
    subtotal = mostrarSubtotal * 1.05;
    document.getElementById("subT").innerHTML = "USD " + subtotal;
    document.getElementById("total").innerHTML = "USD " + subtotal;
}


//funcion que muestra el valor a pagar en el total
function totalFinal() {
    let total = mostrarSubtotal;
    document.getElementById("total").innerHTML = "USD " + total;
}

//funcion que activa un evento change para cambiar el valor del sub total  cuando se modifica la cantidad de articulos
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

// validacion: toma los valores de los campos deseados, y avisa si faltan valores para llenar
function validar() {
    let calle = document.getElementById("calle").value;
    let numero = document.getElementById("numero").value;
    let esquina = document.getElementById("esquina").value;
    if (calle === "" && numero === "" && esquina ==="") {
        alert("faltan llenar campos");
    } else {
        alert("todo bien");
    }
}

function validar2() {
    let moneda = document.getElementById("moneda").value;
    let tarjeta = document.getElementById("tarjeta").value;
    let numero = document.getElementById("numero").value;
    if (moneda === "" && tarjeta === "" && numero === "") {
        alert("faltan llenar campos");
    } else {
        alert("todo bien");
    }
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === 'ok') {
            arrayArticles = resultObj.data.articles;
            showCartProductsAndTotalCost(arrayArticles);
            //validar();
        }
    });
})