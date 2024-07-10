
let username=document.querySelector("#username");
let password=document.querySelector("#password");
let loginBtn=document.querySelector("#sign_in");

let getUser=localStorage.getItem("username");
let getPassword=localStorage.getItem("password");

loginBtn.addEventListener("click",login);

function login (e) {
    e.preventDefault();//to prevent the reload of the page

    if(username.value===""||password.value===""){
        alert("please fill your data");
    }
    else{
        if(
            getUser && 
            getUser.trim()===username.value.trim() && //trim() to delete the space
             getPassword &&
            getPassword===password.value
            ){
                setTimeout(()=>{
                    window.location="index.html";
                },1500);
        }
        else{
            console.log("user name or password is wrong !!");
        }
    }

}
