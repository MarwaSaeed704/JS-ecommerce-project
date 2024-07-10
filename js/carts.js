
let productsDom=document.querySelector('.products');
let noProductsDom=document.querySelector(".noProducts");




function drowCartProductsUI(allproducts = []){
    if(JSON.parse(localStorage.getItem("productsInCart")).length === 0)
        noProductsDom.style.display="block";
    


    let products=JSON.parse(localStorage.getItem("productsInCart")) || allproducts;

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
            <button class="add-to-card" onclick="removeItemFromCart(${item.id})">Remove From Cart</button>
            
        </div><!--./product-item-actions-->


    </div><!--./product-item-->

    `
    });

    productsDom.innerHTML=productsUI.join("");
}

drowCartProductsUI();


// remove item from cart
function removeItemFromCart(id){
    let productsInCart=localStorage.getItem("productsInCart");
    if(productsInCart){
        let items=JSON.parse(productsInCart);

        //will delete if item.id == id
        let filteredItem=items.filter((item) => item.id !== id); 
       localStorage.setItem("productsInCart",JSON.stringify(filteredItem));
        drowCartProductsUI(filteredItem);
    }

}