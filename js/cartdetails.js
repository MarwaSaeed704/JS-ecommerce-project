let products=JSON.parse(localStorage.getItem("products"));
let productId=localStorage.getItem("productId");
let productDom=document.querySelector(".item_details");

let productsDetails=products.find((item)=>item.id == productId);
productDom.innerHTML=`
<img src="${productsDetails.imageUrl}" alt="headphone image"/>
<h2>${productsDetails.title}</h2>
<p>${productsDetails.desc}</p>
<span>size:${productsDetails.size}</span><br>
<span>quantity:${productsDetails.qty}</span><br>
<button onclick="editProduct(${productId})">Edit product</botton>

`;

// edit Product
function editProduct(id){
    localStorage.setItem("editProduct",id);
 
    window.location ="editProduct.html";
 }