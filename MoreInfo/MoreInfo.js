function run(){
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
            // x.click = this.func;
            x.onclick = this.func;
            x.className = "HeaderButton";
            x.type="button";
            return x;
        }
    }

    function Reveal(optionName){
        switch (optionName){
            case "Rules": 
                window.alert("Dsiplay the rules");
                break;
            ;
            case "Activities":
                window.alert("Display the Activities");
                break;
            ;
            case "Projects" :
                window.alert("Display the Projects");
                break;
            ;
            case "Events" :
                window.alert("Display the events");
                break;
            ;
        }
    }
    function ReCompileHeader(){
        buttonOptions.forEach((option,index)=>{
            let myButton = new button(option,()=>{
                Reveal(option);
            });
            headerMid.appendChild(myButton.createButton());
        })

    }

    ReCompileHeader();
}

window.setTimeout(run,100);