var ProductNameInput = document.getElementById("ProductNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var proudactDescInput = document.getElementById("proudactDescInput");
var productNameAlert=document.getElementById("productNameAlert");
var mainBtn = document.getElementById("mainButn");
var productContainer;
var mainIndex = 0;



function validateProdacteName(){

  var regex= /^[A-Z][a-z]{3,8}$/;

  if(regex.test(ProductNameInput.value)==true)
  {
    ProductNameInput.classList.add("is-valid");
    ProductNameInput.classList.remove("is-invalid");
    productNameAlert.classList.replace("d-block" , "d-none")
    return true;
  }
  else
  {
    ProductNameInput.classList.add("is-invalid");
    ProductNameInput.classList.remove("is-valid");
    productNameAlert.classList.replace("d-none" , "d-block")
    return false;

   
  }
}

ProductNameInput.addEventListener("keyup" , validateProdacteName)




if (localStorage.getItem("myproudact") == null) {
  productContainer = [];

}
else {
  productContainer = JSON.parse(localStorage.getItem("myproudact"));
  displayproudact();

}


function addProudact() {

  if(validateProdacteName()==true){



  if (mainBtn.innerHTML == "update") {
    mainBtn.innerHTML = "Add Product";
    var proudact = {

      pName: ProductNameInput.value,
      pPrice: productPriceInput.value,
      pcat: productCategoryInput.value,
      pDesc: proudactDescInput.value,

    }
    productContainer.splice(mainIndex, 1, proudact);

  }
  else {
    var proudact = {

      pName: ProductNameInput.value,
      pPrice: productPriceInput.value,
      pcat: productCategoryInput.value,
      pDesc: proudactDescInput.value,

    }
    productContainer.push(proudact);
  }


  localStorage.setItem("myproudact", JSON.stringify(productContainer));
 
  displayproudact();
  clearForm();

}
}


function clearForm() {
  ProductNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  proudactDescInput.value = "";
  ProductNameInput.classList.remove("is-valid");
  ProductNameInput.classList.remove("is-invalid");
  productNameAlert.classList.replace("d-block" , "d-none")

}


function displayproudact() {

  var hasala = ``;

  for (var i = 0; i < productContainer.length; i++) {
    hasala += `  <tr>
  <td>`+ i + `</td>
  <td>`+ productContainer[i].pName + `</td>
  <td>`+ productContainer[i].pPrice + `</td>
  <td>`+ productContainer[i].pcat + `</td>
  <td>`+ productContainer[i].pDesc + `</td>
  <td><button onclick="updateProudact(`+ i + `)" class="btn btn-outline-info">update</button></td>
  <td><button onclick="deleteProduct(`+ i + `)" class="btn btn-outline-danger">Delete</button></td>


</tr>`
  }
  document.getElementById("tableBody").innerHTML = hasala;

}


function deleteProduct(productIndex) {
  productContainer.splice(productIndex, 1);
  localStorage.setItem("myproudact", JSON.stringify(productContainer));
  displayproudact();

}


function searchProduct(searchTerm) {
  var hasala = ``;
  for (var i = 0; i < productContainer.length; i++) {
    if (productContainer[i].pName.toLowerCase().includes(searchTerm.toLowerCase()) == true) {
      hasala += `  <tr>
      <td>`+ i + `</td>
      <td>`+ productContainer[i].pName + `</td>
      <td>`+ productContainer[i].pPrice + `</td>
      <td>`+ productContainer[i].pcat + `</td>
      <td>`+ productContainer[i].pDesc + `</td>
      <td><button class="btn btn-outline-info">update</button></td>
      <td><button onclick="deleteProduct(`+ i + `)" class="btn btn-outline-danger">Delete</button></td>
    
    
    </tr>`


    }
    else {

    }
  }
  document.getElementById("tableBody").innerHTML = hasala;
}

function updateProudact(productIndex) {
  ProductNameInput.value = productContainer[productIndex].pName;
  productPriceInput.value = productContainer[productIndex].pPrice;
  productCategoryInput.value = productContainer[productIndex].pcat;
  proudactDescInput.value = productContainer[productIndex].pDesc;
  mainBtn.innerHTML = ("update")
  mainIndex = productIndex;
}

