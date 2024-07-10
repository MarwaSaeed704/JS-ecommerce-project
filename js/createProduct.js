let productName=document.getElementById("product-name");
let productDesc=document.getElementById("product-desc");
let productSizeSeclect=document.getElementById("product-size");
let createForm=document.getElementById("create-form");
let inputfile=document.getElementById("upload-image-file");
let productSizeValue;
let productImage;


//events
productSizeSeclect.addEventListener('change',getProductSizeValue);
createForm.addEventListener('submit',createProductFun);
inputfile.addEventListener('change',uploadImage);


//funcations
function getProductSizeValue(e){
    productSizeValue=e.target.value;

}

function createProductFun(e){
    e.preventDefault();
    let allProduct=JSON.parse(localStorage.getItem("products")) || productsDB;
    let nameValue=productName.value;
    let descValue=productDesc.value;

    if(nameValue && descValue){
        let obj={
            id:allProduct ? allProduct.length+1 : 1,
            qty:1,
            imageUrl:productImage,
            size:productSizeValue,
            title:nameValue,
            desc:descValue,
            isMe:"Y",
        };
    
        let newProducts=allProduct? [...allProduct,obj] : [obj];
        localStorage.setItem("products",JSON.stringify(newProducts));
    
        //to delets this places(inputs)
        productName.value="";
        productDesc.value="";
        productSizeSeclect.value="";

        setTimeout(()=>{
            window.location="index.html";

        }, 500);
    

    }else{
        alert("Enter Data ....");
    }

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