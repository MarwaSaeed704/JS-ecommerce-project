
let username=document.querySelector("#username");
let email=document.querySelector("#email");
let password=document.querySelector("#password");
let registerBtn =document.querySelector("#sign_up");
let inputFile = document.querySelector("#user-image");
let userImage;

//events
registerBtn.addEventListener("click", register);
inputFile.addEventListener("change",uploadImage)

//functions
function register(e){
    
        e.preventDefault();//to prevent the reload of the page
    
        if(username.value===""||email.value===""||password.value===""||userImage===""){
            alert("please fill your data");
        }
        else{
            localStorage.setItem("username",username.value);
            localStorage.setItem("email",email.value);
            localStorage.setItem("password",password.value);
            localStorage.setItem("userImage",userImage);
    
            setTimeout(()=>{
                window.location="login.html";
            },1500);
        }
    
    
}


function uploadImage(){
    let file = this.files[0];
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
}

function getImageBase64(file){
    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function(){
        userImage=reader.result;

    };

    reader.onerror = function(){
        alert("error!!");
    };
}

