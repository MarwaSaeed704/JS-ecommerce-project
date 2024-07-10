
//to storge data 
//localStorage.setItem("key", "value");
// localStorage.setItem("name","marwa");
// localStorage.setItem("test","123");

//to get the value

// console.log(localStorage.getItem("name"));
// console.log(localStorage.getItem("test"));

//to remove one item
//localStorage.removeItem("name");

//to remove all items
//localStorage.clear();







//define products
let productsDom=document.querySelector('.products');
let products=productsDB;


//JSON.parse(); //convert string to object
//JSON.stringify(); //convert object to string


//display products
let drowProductsUI;
( drowProductsUI = function (products = []){
    let productsUI=products.map((item)=>{
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

            ${item.isMe === "Y" && 
            "<button class='edit-product' onClick='editProduct("+
            item.id+
            ")'> Edit Product </button>"}

        </div><!--./product-item-desc-->

        <div class="product-item-actions">
            <button class="add-to-card" onclick="addedToCart(${item.id})">Add To Card</button>
            <i class="favorite far fa-heart" onclick="addToFavourite(${item.id})" 
            style="color :${item.liked==true ? "red" : ""}"></i>


        </div><!--./product-item-actions-->


    </div><!--./product-item-->

    `
    });

    productsDom.innerHTML=productsUI.join("");  //we use join() to delete ',' that is after every element
})(JSON.parse(localStorage.getItem("products"))||products);


//add to cart
function addedToCart(id){
    if(localStorage.getItem('username')){

        //to read all item that is in local storage 
        let products=JSON.parse(localStorage.getItem("products"))||products;
        let product=products.find((item) => item.id===id);
       
        let isProductInCart=addItem.some((i) =>i.id===product.id);//some return true or false
        if(isProductInCart){
            addItem=addItem.map(p=>{
                if(p.id === product.id)p.qty +=1;
                return p;
            })
        }
        else{
            addItem.push(product);
        }
        
        //UI
        cartProductDivDom.innerHTML = "";
        
        addItem.forEach((item)=>{
            cartProductDivDom.innerHTML +=`<p>${item.title} <span class='item-qty'>${item.qty}</span></p>`;
        });

        //json.stringify convert the object to string  
        // we convert the object to string to can store in local stroge
       // addItem=[...addItem,product];
       // let uniqueProducts=getUniqueArr(addItem,"id");

       //save Data
        localStorage.setItem("productsInCart",JSON.stringify(addItem));

        //Add counter of items
        let cartProductItems=document.querySelectorAll(".carts-products div p");
        badgeDom.style.display="block";
        badgeDom.innerHTML = cartProductItems.length;
        
    }
    else{
        window.location="login.html";
    }
   

}


//get unique array
function getUniqueArr(arr,filterType){
    // map(item,index,array)
    let unique=arr
                  .map((item)=>item[filterType])//return [id] => [[1,1],[2]]
                  .map((item,index,finalArr)=>finalArr.indexOf(item)===index && index)//[0,false,1]//if condesion is true return index  
                  .filter((item)=>arr[item]) //will return item without false;
                  .map((item)=>arr[item]); //return array of unique item

    return unique;              
                                                                                       
                  
}



//save item data
function saveItemData(id){
    localStorage.setItem("productId",id);
    window.location="cartdetails.html";
    /////////
    let viewId = localStorage.getItem("productId");
    addToMyView(viewId);

}

//search by name 
let input=document.getElementById("search");
input.addEventListener("keyup",function(e){
    // keyCode ===13 that mean "enter"
    let products =JSON.parse(localStorage.getItem("products"))||products;
        search(e.target.value,products);

   

    if(e.target.value.trim()===""){
        drowProductsUI(products);
    }
   

});
function search(title,myArray){
    // for(var i=0 ;i<myArray.length;i++){
    //     if(myArray[i].title===title)
    //     console.log(myArray[i])
    // }
    //indexof mean that search inside the title if find any part from title return 1
    //if the indexof return -1 that mean it there is no that the title
    let arr = myArray.filter((item)=>item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1);
    drowProductsUI(arr);

}


//add to favourite
let favouriteItems = localStorage.getItem("productFavourite")
    ? JSON.parse(localStorage.getItem("productFavourite")) 
    : [];
function addToFavourite(id){
    if(localStorage.getItem("username")){
        let choosenItem=products.find((item)=>item.id === id);
        choosenItem.liked=true;
        favouriteItems=[...favouriteItems,choosenItem];
        let uniqueProducts=getUniqueArr(favouriteItems ,"id");
        localStorage.setItem("productFavourite" , JSON.stringify(uniqueProducts));
        products.map(item =>{
            if(item.id==choosenItem.id){
                item.liked=true;
                return item;
            }
            
        });
        localStorage.setItem("products",JSON.stringify(products));
        drowProductsUI(products);
    }else{
        window.location= "login.html";
    }

}

//add to my view
let viewItems = localStorage.getItem("productId")
    ? JSON.parse(localStorage.getItem("productId"))
    : []; 

function addToMyView(id){
    if(localStorage.getItem("username")){
        let choosenItem = products.find((item)=>item.id === id);
        viewItems = [...viewItems,choosenItem];
        let uniqueProducts = getUniqueArr(viewItems,"id");
        localStorage.setItem("productsView",JSON.stringify(uniqueProducts));
        products.map(item =>{
            if(item.id == choosenItem.id){
                return item;
            }
        });
        localStorage.setItem("products",JSON.stringify(products));
        drowProductsUI(products);
        
    }else{
        window.location = "login.html";
    }

}




//filter product by size
let productFilter = document.getElementById("size-filter");

productFilter.addEventListener("change",getProductFilterBySize);

function getProductFilterBySize(e){
    let val = e.target.value;
    let products =JSON.parse(localStorage.getItem('products'))||products;
    if(val === "all"){
        drowProductsUI(products);
    }else{
        
        products = products.filter((i)=>i.size === val);
        drowProductsUI(products);
    }


}



// edit Product
function editProduct(id){
   localStorage.setItem("editProduct",id);

   window.location ="editProduct.html";
}



