import { grabFile } from "../Common.js";

let HiddenInfo = "/MoreInfo/HiddenInfo.html";
let infoCategories = ["Rules", "Activities", "Projects", "Events"];

function preRun(){
    let headerMid = document.getElementById("HeaderMiddle");
    
    class button{
        constructor(text,func){
            this.text = text;
            this.func = func;
        }

        createButton(){
            let x = document.createElement('button');
            x.textContent = this.text;
            x.onclick = this.func;
            x.className = "HeaderButton";
            x.type="button";
            return x;
        }
    }

    function Reveal(optionName){
        switch (optionName){
            case "Rules": 
                ReplaceContent(optionName);
                break;
            ;
            case "Activities":
                ReplaceContent(optionName);
                break;
            ;
            case "Projects" :
                ReplaceContent(optionName);
                break;
            ;
            case "Events" :
                ReplaceContent(optionName);
                break;
            ;
            default: 
                window.alert("Insecure Debugger - Invalid selection");
        }
    }

    function ReCompileHeader(){
        infoCategories.forEach((option)=>{
            let myButton = new button(option,()=>{
                Reveal(option);
            });
            headerMid.appendChild(myButton.createButton());
        })

    }

    ReCompileHeader();
    document.getElementById("SearchButton").onclick = ()=>{
        let key = document.getElementById("SearchBarSearch").value;
        Search(key);
    }
}

//Function to get the "Hidden Info" and replace it with the "Visible info"
async function ReplaceContent(topic){
    let content = await grabFile(HiddenInfo);
    let tempDoc = document.implementation.createHTMLDocument();
    tempDoc.body.innerHTML = content;
    console.log(tempDoc);

    let contentToShow = tempDoc.getElementById(topic);
    let origins = tempDoc.getElementById("Origins");
    let visibleInfo = document.getElementById("VisibleInfo");
    
    if (infoCategories.indexOf(topic) != -1){
        if (visibleInfo.children[0].getAttribute("id") == topic){
            visibleInfo.replaceChildren(origins);
        }
        else{
            visibleInfo.replaceChildren(contentToShow);
        }
    }
    tempDoc = null;
}

window.setTimeout(preRun,100);

//Searchbar Functionality

async function Search(keyword){
    let content = await grabFile(HiddenInfo);
    let tempDoc = document.implementation.createHTMLDocument();
    
    tempDoc.body.innerHTML = content;
    let categories = tempDoc.body.children;
    let bFoundRes = false;

    for (var i=0 ; i<tempDoc.body.childElementCount;i++){ 
        let categoryText = categories[i].textContent;
        let index = categoryText.indexOf(keyword);
        let category = categories[i].id;
        let formattedText = "";

        if (index != -1){
            let spaces = spaceIndexes(categoryText,index,3,3);
            formattedText = categoryText.substring(spaces.spaceBefore,spaces.spaceAfter);
            bFoundRes = true;
            console.log(spaces);
            console.log(formattedText);
            let result = new searchResult(formattedText,category);
            result.showResults();
        }
    }

    if (bFoundRes == false){
        let result = new searchResult("Query not found...","undefined");
        result.showResults();
    }

    document.getElementById("SearchResultContainer").style = "display:block";
}

class searchResult{
    constructor(displayText, category){
        this.displayText = displayText;
        this.category = category;
        this.parentContainer = document.getElementById("SearchResultContainer");
    }

    showResults(){
        let parent = document.createElement("div");
        let searchRes = document.createElement("p");
        let categorytext = document.createElement("p");
        let parentContainer = this.parentContainer;

        searchRes.innerText = this.displayText;
        searchRes.style = "background-color:white; color:black;";
        parent.onclick = ()=>{ReplaceContent(this.category)};
        

        categorytext.innerText = "from: " + this.category;
        categorytext.style = "background-color:black; color:white;";
        
        //By allocating a class, each of the results can be structured according to the class they are in.
        parent.class = "resFrom"+this.category;
        parent.append(searchRes,categorytext);
        console.log(this.parentContainer);
        parentContainer.append(parent);


        document.addEventListener("click",this.hideResults,{once:true})
    }

    hideResults(){
        let parentContainer = document.getElementById("SearchResultContainer");
        console.log(parentContainer);
        if (parentContainer.style.display != "none"){
            parentContainer.style = "Display:none";
            parentContainer.replaceChildren();
            parentContainer.value = "";
            console.log("Deleted results")
        }
        else{
            console.log("No delete results")
        }
    }
}

//Word index is a number, spaceIndex is a dict of these numbers!
//After minimal consideration, this will be used again to find more words in the same paragraph/search location which match the search query. 
//THIS CAN EVEN POSSIBLY BE USED TO SEARCH A WEB DOC FOR SOMETHING -- or not
function spaceIndexes(searchString, wordIndex, numSpacesBefore,numSpacesAfter){
    let spaceIndex = {spaceBefore:wordIndex, spaceAfter:wordIndex};
    

    for (var i=0;i<numSpacesBefore;i++){
        spaceIndex.spaceBefore = searchString.lastIndexOf(" ",spaceIndex.spaceBefore-1);
        if (spaceIndex.spaceBefore < 0){
            spaceIndex.spaceBefore=0;
            break;
        }
    }
    //backup index cause indexof will return -1 if no substr is found after the last found substr.
    for (var i=0;i<numSpacesAfter;i++){
        let backupIndex = spaceIndex.spaceAfter;
        spaceIndex.spaceAfter = searchString.indexOf(" ",spaceIndex.spaceAfter+1);
        if (spaceIndex.spaceAfter < 0){
            spaceIndex.spaceAfter = backupIndex;
            break;
        }
        else{
            backupIndex = spaceIndex.spaceAfter;
        }
    }

    return spaceIndex;
}

// document.onclick = ()=>{
    
// }