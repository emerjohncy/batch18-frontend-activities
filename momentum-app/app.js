//List of quotes
let quotesList = [
    "Never stop learning because life never stops teaching.",
    "Dreams don't work unless you do.",
    "Good things will come!",
    "You matter.",
    "Focus on the step in front of you, not the entire staircase."
]

// Enter key functionality on "Enter Name"
var inputName = document.querySelector("#intro");
var startingPage = document.querySelector("#starting-page");
inputName.addEventListener("keyup", function(event){
    if(event.keyCode === 13 && inputName.value !== ""){
        startingPage.style.display = "none";

        var header = document.querySelector("#header");
        var footer = document.querySelector("#footer");
        header.style.visibility = "visible";
        footer.style.visibility = "visible";

        //Greeting
        var greeting = document.querySelector("#greeting");
        var today = new Date();
        var hour = today.getHours();
        if(hour >= 0 && hour < 12){
            greeting.innerHTML = "Good Morning, " + inputName.value + "!"
        } else if(hour >= 12 && hour < 18){
            greeting.innerHTML = "Good Afternoon, " + inputName.value + "!"
        } else if(hour >= 18){
            greeting.innerHTML = "Good Evening, " + inputName.value + "!"
        }

        //Display a quote from the list every 5 seconds
        var quotes = document.querySelector("#quote");
        var i = 0;

        function quotesDisplay(){
            quotes.innerHTML = quotesList[i];
            i = i + 1;
            if(i < quotesList.length){
                setTimeout(quotesDisplay, 5000);
            }else if(i === quotesList.length){
                i = 0;
                setTimeout(quotesDisplay, 5000);
            }
        }
        setTimeout(quotesDisplay, 0000);
    }
});

// Current time
function time() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    

    // If AM/PM 
    let period ="AM";
    
    if(h > 12){
        period = "PM";
        h = h % 12; // 12-hr format
    } else if(h === 12){
        period = "PM";
    } else if(h === 0){
        h = 12;
    }
    
    // add zero in front of numbers < 10
    function addZero(i){
        if (i < 10) {
            i = "0" + i
        }
        return i;
    }
    h = addZero(h);
    m = addZero(m);
    s = addZero(s);

    document.querySelector(".hour").innerHTML = h;
    document.querySelector(".minutes").innerHTML = m;
    document.querySelector(".seconds").innerHTML = s;
    document.querySelector(".period").innerHTML = period;
}
var updateClock = setInterval(time, 1000)

//Main Focus functionality
var mainFocus = document.querySelector("#main-focus");
var labelMainFocus = document.querySelector("#label-main-focus");
var divMainFocus = document.querySelector("#div-main-focus");
mainFocus.addEventListener("keyup", function(event){
    if(event.keyCode === 13 && mainFocus.value !== ""){
        labelMainFocus.innerText = "TODAY";
        labelMainFocus.style.color = "#4cc9f0";
        mainFocus.style.display = "none";
        let valueMainFocus = document.createElement("div");
        valueMainFocus.innerText = mainFocus.value;
        valueMainFocus.style.color = "white";
        valueMainFocus.style.fontSize = "5vw";
        divMainFocus.append(valueMainFocus);
    }
})

// Toggle of Add New Quote
var addNewQuote = document.querySelector("#new-quote");
var inputQuote = document.querySelector("#input-quote");
addNewQuote.addEventListener("click", function(){
    inputQuote.classList.toggle("active");
    addNewQuote.classList.toggle("active");
})

// Enter key functionality on add new quote
var inputQuote = document.querySelector("#input-quote");
inputQuote.addEventListener("keyup", function(event){
    if(event.keyCode === 13 && inputQuote.value !== null){
        quotesList.push(inputQuote.value);
        inputQuote.classList.remove("active");
        addNewQuote.classList.remove("active");
        inputQuote.value = "";
    }
})

// Auto resizing text area
const tx = document.getElementsByTagName("textarea");
for (let k = 0; k < tx.length; k++) {
  tx[k].setAttribute("style", "height:" + (tx[k].scrollHeight) + "px;overflow-y:hidden;");
  tx[k].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}

// Toggle of To Do
var addToDo = document.querySelector("#to-do");
var divToDo = document.querySelector("#div-to-do");
addToDo.addEventListener("click", function(){
    divToDo.classList.toggle("active");
    addToDo.classList.toggle("active");
})

// Enter key functionality on To Do
let toDoList = [];

var containerToDo = document.querySelector("#container-to-do");
var inputToDo = document.querySelector("#input-to-do")
inputToDo.addEventListener("keyup", function(event){
    if(event.keyCode === 13 && inputToDo.value !== ""){
        toDoList.push(inputToDo.value)

        var toDoContainer = document.createElement("div");
        var toDo = document.createElement("input");
        var toDoLabel = document.createElement("label");
        toDo.setAttribute("id", inputToDo.value);
        toDo.setAttribute("class", "checkbox-to-do");
        toDo.setAttribute("type", "checkbox");
        toDoLabel.textContent = inputToDo.value;
        toDoLabel.setAttribute("for", inputToDo.value);
        
        containerToDo.append(toDoContainer);
        toDoContainer.append(toDo);
        toDoContainer.append(toDoLabel);

        inputToDo.value = "";

        var titleToDo = document.querySelector("#title-to-do");
        if (toDoList.length === 0){
            titleToDo.innerHTML = "NOTHING TO DO";
        } else if(toDoList.length === 1){
            titleToDo.innerHTML = "1 THING TO DO";
        } else if(toDoList.length > 1){
            titleToDo.innerHTML = toDoList.length + " THINGS TO DO";
        }
    }
})

const checkbox = document.querySelectorAll(".checkbox-to-do")
if (checkbox.checked === true){
    checkbox.label.style.textDecoration = "line-through";
}
