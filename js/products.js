//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


//fetch

//const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";

document.addEventListener("DOMContentLoaded", function (e) {

  var showSpinner = function(){
    document.getElementById("spinner-wrapper").style.display = "block";
  }

  var hideSpinner = function(){
    document.getElementById("spinner-wrapper").style.display = "none";
  }

  var getJSONData = function(link){
      var result = {};
       showSpinner();
      return fetch(link)
      .then(response => {
        hideSpinner();
        if (response.ok) {
          return response.json();
        }else{
          throw Error(response.statusText);
        }
      })
      .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
      })
      .catch(function(error) {
          result.status = 'error';
          result.data = error;
          hideSpinner();
          return result;
      });
  }


});
