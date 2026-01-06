var MainComponents = [
    {file:"/SyncedComponents/Header-component.html", id:"Header"},
    {file:"/SyncedComponents/Footer-component.html", id:"Footer"}
];

let pathIDs = ["Home", "Members", "MoreInfo"];
let pathListText = ["Home","Active Members", "Additional Info"];
let pathDirectory = ["/Home/HomePage.html", "/Members/MembersPage.html", "/MoreInfo/MoreInfoPage.html"];

const preloaded = new Event("Preloaded");
window.addEventListener("Preloaded",onPreloaded(showLoaded),{once:false});
//Extra steps to help me out later
function showLoaded(){
    console.log("comps loaded")
}

function onPreloaded(){
    showLoaded();
}



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

function Reroute(){
    let page = document.querySelector("meta[name=\"description\"]").getAttribute("content");
    let headerMid = document.getElementById("HeaderMiddle");
    console.log(page);
    if (document.readyState== "complete"){
        let routes = document.getElementById("Routes");
        console.log(routes);

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

    window.addEventListener("Preloaded",onPreloaded);
}

async function Run(){
    let result = await LoadAll(MainComponents);
    console.log("Done loading");
    setTimeout(Reroute,100);
}



Run();

// LoadStyles();
