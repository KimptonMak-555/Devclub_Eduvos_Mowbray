function switchToHome(){
    // let prefix= window.location.href;
    window.open("Home/HomePage.html","_self");
    
}

console.log("switchign to home in 5000 ms");
console.log(window.location.origin);
window.setTimeout(switchToHome,3000);
