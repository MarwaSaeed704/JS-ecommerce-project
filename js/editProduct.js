
// variales 
let products = JSON.parse(localStorage.getItem("products")) || productsDB;
let productId = JSON.parse(localStorage.getItem("editProduct"));
let getProduct = products.find((i)=>i.id === productId);

let productName=document.getElementById("product-name");
let productDesc=document.getElementById("product-desc");
let productSizeSeclect=document.getElementById("product-size");
let updateForm=document.getElementById("update-form");
let inputfile=document.getElementById("upload-image-file"); 
let productSizeValue;
let productImage;

productName.value = getProduct.title;
productDesc.value = getProduct.desc; 
productSizeSeclect.value = getProduct.size;
productImage = getProduct.imageUrl;

console.log("product before",products)


 //events
 productSizeSeclect.addEventListener('change',getProductSizeValue);
 updateForm.addEventListener('submit',updateProductFun);
inputfile.addEventListener('change',uploadImage);


 //funcations

 //get product size
function getProductSizeValue(e){
    productSizeValue=e.target.value;

}

// update product 

function updateProductFun(e){
    e.preventDefault();

    getProduct.title = productName.value;
    getProduct.desc = productDesc.value;
    getProduct.size = productSizeValue;
    getProduct.imageUrl = productImage;


    localStorage.setItem("products",JSON.stringify(products));

            setTimeout(()=>{
            window.location="index.html";

        }, 500);
 }

function uploadImage(){
    let file=this.files[0];//this refer to -> inputfile
    let types=["image/png","image/jpeg"];
    
    if( types.indexOf(file.type) == -1 ){
        alert("type not support");
        return;
        
    }
    
    if(file.size > 2*1024*1024){
        alert("image not exced 2MG");
        return;
    }
    
    getImageBase64(file);
    
   // productImage=URL.createObjectURL(file);//to change the url to binary
}

function getImageBase64(file){
    let reader= new FileReader();
    reader.readAsDataURL(file);// read url and return base 64

    reader.onload=function(){
        productImage = reader.result;

    };

    reader.onerror = function(){
        alert("error !!")

    };


}