let HiddenInfo = "/MoreInfo/HiddenInfo.html";
let MoreInfo = "/MoreInfo/MoreInfoPage.html";

function preRun(){
    let headerMid = document.getElementById("HeaderMiddle");
    let buttonOptions = ["Rules", "Activities", "Projects", "Events"];
    
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
                window.alert("Invalid selection");
        }
    }

    function ReCompileHeader(){
        buttonOptions.forEach((option)=>{
            let myButton = new button(option,()=>{
                Reveal(option);
            });
            headerMid.appendChild(myButton.createButton());
        })

    }

    ReCompileHeader();
    document.getElementById("SearchButton").onclick = (key)=>{
        Search("hey");
    }
}

window.setTimeout(preRun,100);

//Searchbar Functionality
//Testing out making use of JS modules
import { grabFile } from "../Common.js";

async function Search(keyword){
    let content = await grabFile(HiddenInfo);
    console.log(content);
}

async function ReplaceContent(topic){
    let content = await grabFile(HiddenInfo);
    let tempDoc = document.implementation.createHTMLDocument();
    tempDoc.body.innerHTML = content;
    console.log(tempDoc);

    let contentToShow = tempDoc.getElementById(topic);
    let origins = tempDoc.getElementById("Origins");
    let visibleInfo = document.getElementById("VisibleInfo");
    console.log(visibleInfo.children[0]);
    
    if (visibleInfo.children[0].getAttribute("id") == topic){
        visibleInfo.replaceChildren(origins);
    }
    else{
        visibleInfo.replaceChildren(contentToShow);
    }
    tempDoc = null;
}