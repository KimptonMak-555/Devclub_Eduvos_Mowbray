window.addEventListener('load',Run,{once:true})

var MainComponents = [
    {file:"../SyncedComponents/Header-component.html", id:"Header"},
    {file:"../SyncedComponents/Footer-component.html", id:"Footer"}
];

let pathIDs = ["Home", "Members", "MoreInfo"];
let pathListText = ["Home","Active Members", "Additional Info"];
let pathDirectory = ["../Home/HomePage.html", "../Members/MembersPage.html", "../MoreInfo/MoreInfoPage.html"];

const preloaded = new Event("Preloaded");
const loadedComps = new Event("CompsLoaded");

async function Run(){
    let result = await LoadAll(MainComponents);
    console.log("Done loading");
    setTimeout(Reroute,100);
    
}

function onPreloaded(){
    showLoaded();
}


//component.file is a string of the filename. fetch retrieves the file with a matching file name. response.text returns the text in the file.
//After some research, found out that the fetch API is a simpler alternative to making use of AJAX(Asynchrous JS & XML)
// !!1/10/26!! After further work and research, created a module to do this, but out of laze, will not change this part - also as a pointer to an old exp savestate.
async function Load(component){
    const response = await fetch(component.file);
    return response.text()
    .then(html => {
        document.getElementById(component.id).innerHTML = html;
    });
}

async function LoadAll(components){
    components.forEach(component => {
        Load(component);
    });
    return "OK";
}

// function LoadStyles(){
//     let mainStyle = document.createElement("link");
//     mainStyle.href = "/main.css";
//     mainStyle.rel = "stylesheet";
//     document.head.appendChild(mainStyle);
//     console.log("Loaded style");
// }

//Dynamically creates the "directory" paths, so that the routing on following pages aligns with the page and possible destinations. Coulda used a class!
function CreatePaths(ID){
    let path = document.createElement("a");
    let pos =-1;

    for (const pathID in pathIDs){
        console.log("pathID;");
        console.log(pathID);
        console.log("ID");
        console.log(ID);
        if (ID == pathIDs[pathID]){
            console.log("Found");
            pos = pathID;
            break;
        }
        else{
            console.log("continue")
        }
    }
    
    console.log(pos);
    let returnObj = path;
    console.log(returnObj)
    returnObj.text = pathListText[pos];
    returnObj.href= pathDirectory[pos];

    return returnObj;
}

//Does the actual route / path adding, adding folders to the PATH to be accessed through CLI. (adds the path "objects" to the directory)
function Reroute(){
    let page = document.querySelector("meta[name=\"description\"]").getAttribute("content");
    let headerMid = document.getElementById("HeaderMiddle");

    if (document.readyState== "complete"){
        let routes = document.getElementById("Routes");

        if (page == "MembersPage"){
            headerMid.innerHTML = "<p>Vossie #DevClub WOOH! </p>";
            routes.replaceChildren(CreatePaths("Home"), CreatePaths("MoreInfo"));
        }
        else if (page=="HomePage"){
            headerMid.innerHTML = "<p>Vossie #DevClub WOOH! </p>";
            routes.replaceChildren(CreatePaths("MoreInfo"),CreatePaths("Members"));
        }
        else if (page="MoreInfoPage"){
            routes.replaceChildren(CreatePaths("Home"), CreatePaths("Members"));
        }
    }
    else{
        setTimeout(Reroute, 500);
    }

    window.dispatchEvent(preloaded);
}





// if (document.readyState == "complete"){
//     Run();
// }
// else{
//     document.onreadystatechange()
// }
