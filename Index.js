function switchToHome(){
    window.open("/Home/HomePage.html");
    console.log(document.URL)
    console.log("switched to home")
}

console.log("switchign to home in 200 ms")
window.setTimeout(switchToHome,200);