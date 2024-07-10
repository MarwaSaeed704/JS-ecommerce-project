
//get Data from local storage 
let get_user=localStorage.getItem('username');
let get_email=localStorage.getItem('email');
let get_image=localStorage.getItem('userImage');
let products=JSON.parse(localStorage.getItem('products'))||productsDB;
let myProducts=products.filter((i) => i.isMe==="Y");

//variables
let userDom2=document.getElementById("username");
let userEmailDom=document.getElementById("email");
let userImageDom=document.getElementById("user-image");
let productLength=document.querySelector("#productslength span")

userDom2.innerHTML=get_user;
userEmailDom.innerHTML=get_email;
userImageDom.innerHTML=`<img src="${get_image}" alt="user image"/>`;

if(myProducts.length != 0){
    productLength.innerHTML=myProducts.length;

}else{
    productLength.remove();

}
