function switchToHome(){
    window.open("/Home/HomePage.html","_self");
    console.log("switched to home")
}

console.log("switchign to home in 200 ms")
window.setTimeout(switchToHome,200);