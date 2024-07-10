//language
let getLang = localStorage.getItem("langDir");
if(getLang){
    if(getLang =="ltr"){
        changeDir("ltr");
    }else{
        changeDir("rtl");
    }
}

//change language
let en = document.getElementById("en-lang");
let ar = document.getElementById("ar-lang");

en.addEventListener("click",()=>{changeDir("ltr")});
ar.addEventListener("click",()=>{changeDir("rtl")});

function changeDir(dir){
    //document -> refer to html page
    //documentElement ->refer to html tag
    document.documentElement.setAttribute("dir",dir);//to control in the html tag
    localStorage.setItem("langDir",dir);
}
