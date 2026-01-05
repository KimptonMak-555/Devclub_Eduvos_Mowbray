var MainComponents = [
    {file:"/SyncedComponents/Header-component.html", id:"Header"},
    {file:"/SyncedComponents/Footer-component.html", id:"Footer"}
];

const LoadedComponents = new Event("Preloaded");
window.addEventListener("Preloaded",()=>{console.log("comps loaded")});

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
    let pathIDs = ["Home", "Members", "MoreInfo"];
    let pathListText = ["Home","Active Members", "Additional Info"];
    let pathDirectory = ["/Home/HomePage.html", "/Members/MembersPage.html", "/MoreInfo/MoreInfoPage.html"];
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
    console.log(page);
    if (document.readyState== "complete"){
        let routes = document.getElementById("Routes");
        console.log(routes);

        if (page == "MembersPage"){
            routes.replaceChildren(CreatePaths("Home"), CreatePaths("MoreInfo"));
        }
        else if (page=="HomePage"){
            routes.replaceChildren(CreatePaths("MoreInfo"),CreatePaths("Members"));
        }
        else if (page="More Info Page"){
            routes.replaceChildren(CreatePaths("Home"), CreatePaths("Members"));
        }
    }
    else{
        setTimeout(Reroute, 500);
    }
}

async function Run(){
    let result = await LoadAll(MainComponents);
    console.log("Done loading");
    setTimeout(Reroute,100);
}



Run();

// LoadStyles();
