function switchToHome(){
    let prefix= window.location.href;
    window.open(prefix + "/Home/HomePage.html","_self");
    
}

console.log("switchign to home in 5000 ms");
console.log(window.location.href);
window.setTimeout(switchToHome,5000);
