let cartProductmenu=document.querySelector(".carts-products");
let cartProductDivDom=document.querySelector(".carts-products div");
let shoppingCartIcon=document.querySelector(".shoppingCart");
let badgeDom=document.querySelector(".badge");


//open cart menu
shoppingCartIcon.addEventListener("click",openCartMenu);


//check if there is item in local storage
let addItem=localStorage.getItem("productsInCart") 
            ? JSON.parse(localStorage.getItem("productsInCart")):[];

// cart menu data
(function cartMenuData(){
    

    if(addItem){
        addItem.map(item =>{
            cartProductDivDom.innerHTML +=`<p>${item.title} ${item.qty}</p>`;
            
        });
        badgeDom.style.display="block";
        badgeDom.innerHTML +=addItem.length;
    }

})();


//open cart menu
function openCartMenu(){
    if(cartProductDivDom.innerHTML !="")
    {
       if( cartProductmenu.style.display=="block"){

        cartProductmenu.style.display="none";
       }else{
        cartProductmenu.style.display="block";
       }

    }
    
}