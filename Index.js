function switchToHome(){
    let prefix= window.location.origin;
    window.open("Home/HomePage.html","_self");
    
}

console.log("switchign to home in 5000 ms")
console.log(window.location.origin)
window.setTimeout(switchToHome,2000);