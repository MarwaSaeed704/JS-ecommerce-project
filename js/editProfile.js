//get data from local storage
let get_user = localStorage.getItem('username');
let get_email = localStorage.getItem('email');
let get_image = localStorage.getItem("userImage");



//variable
let userInput = document.getElementById("changeName");
let userEmailInput = document.getElementById("changEmail"); 
let inputfile = document.getElementById("upload-image-file");
let editForm = document .getElementById("edit-profile-form");
let profileImage;

//setting values of input

userInput.value = get_user;
userEmailInput.value = get_email;
profileImage = get_image;

//Events
editForm.addEventListener("submit",editProfileData);
inputfile.addEventListener("change",uploadImage);


//fucations

function editProfileData(e){
    e.preventDefault();

    localStorage.setItem('username',userInput.value);
    localStorage.setItem('email',userEmailInput.value);
    localStorage.setItem('userImage',profileImage);

    setTimeout(()=>{
        window.location = "profile.html";

    },500);

}



function uploadImage(){
    let file = this.files[0];
    let types = ["image/png","image/jpeg"];

    if(types.indexOf(file.type) == -1){
        alert("type not suport !!");
        return;
    }

    if(file.size > 2*1024*1024){
        alert("size is exced 2 MG");
        return;
    }

    getImageBase64(file);
}

function getImageBase64(file){
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function(){
        profileImage = reader.result;

    };

    reader.onerror = function(){
        alert("erorr !!");

    };

}