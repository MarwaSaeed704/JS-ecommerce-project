
let productsDom=document.querySelector('.products');
let noProductsDom=document.querySelector(".noProducts");



function drowFavoriteProductsUI(allproducts = []){
    if(JSON.parse(localStorage.getItem("productFavourite")).length === 0)
        noProductsDom.style.display="block";
    


    let products=JSON.parse(localStorage.getItem("productFavourite")) || allproducts;

    let productsUI=products.map((item)=>{
        return `
        <div class="product-item">
        <img
         src="${item.imageUrl}" 
         class="product-item-img" 
         alt="iphone img" />
        <div class="product-item-desc">
            <h2>${item.title}</h2>
            <p>${item.desc} </p>
            <span>size: ${item.size}</span><br>
            <span>quantity: ${item.qty}</span>

        </div><!--./product-item-desc-->

        <div class="product-item-actions">
            <button class="add-to-card" onclick="removeItemFromfavourite(${item.id})">Remove favorite</button>
            
        </div><!--./product-item-actions-->


    </div><!--./product-item-->

    `
    });

    productsDom.innerHTML=productsUI.join("");
}

drowFavoriteProductsUI();


// remove item from favourite
function removeItemFromfavourite(id){
    let productFavourite=localStorage.getItem("productFavourite");
    if(productFavourite){
        let items=JSON.parse(productFavourite);

        //will delete if item.id == id
        let filteredItem=items.filter((item) => item.id !== id); 
       localStorage.setItem("productFavourite",JSON.stringify(filteredItem));
       drowFavoriteProductsUI(filteredItem);
    }

}