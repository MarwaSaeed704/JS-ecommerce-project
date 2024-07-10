

let productsDom = document.querySelector('.products');
let noProductsDom = document.querySelector('.noProducts');




//display products
let drowProductsUI;
( drowProductsUI = function (products = []){
    let myProducts=products.filter((items)=>items.isMe === "Y");
    if(myProducts.length != 0){
       // console.log("yes x")
    let productsUI=myProducts.map((item)=>{
        return `
        <div class="product-item" style = "border: ${
            item.isMe === "Y" ? "2px solid green" :""
         }">
        <img
         src="${item.imageUrl}" 
         class="product-item-img" 
         alt="iphone img" />
        <div class="product-item-desc">
            <a onclick="saveItemData(${item.id})">${item.title}</a>
            <p>${item.desc} </p>
            <span>size: ${item.size}</span>

            <button class='edit-product' onClick='editProduct(${
                item.id
            })'> Edit Product </button>
            <br>
            <button class='edit-product' onClick='deleteProduct(${
                item.id
            })'>  Delete Product </button>
    
        </div><!--./product-item-desc-->

    </div><!--./product-item-->

    `;
    });

    //we use join() to delete ',' that is after every element
    productsDom.innerHTML=productsUI.join(""); 
}
else{
    //noProductsDom.innerHTML=" NO products !!";
    noProductsDom.style.display="block";
    //console.log("no");
}

})(JSON.parse(localStorage.getItem("products")) || productsDB);



// edit Product
function editProduct(id){
    localStorage.setItem("editProduct",id);
 
    window.location ="editProduct.html";
 }
 

//funcation delete
function deleteProduct(id){
    let products = JSON.parse(localStorage.getItem("products")) || productsDB;
    let myProducts = products.filter((item)=>item.isMe === "Y");
    let filtered = myProducts.filter((i)=>i.id !== id);

    let clickedItem = myProducts.find((i)=>i.id === id);

    products = products.filter((i)=>i.id !== clickedItem.id);

   // console.log(products);
     
    localStorage.setItem("products",JSON.stringify(products));
    drowProductsUI(filtered);

}