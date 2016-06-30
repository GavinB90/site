// -------------- VARIABLES -----------------
var gameInstructions = 0;
var numberList = [];
var numberListCopy = [];
var usedNumbers = [];
// Setting var for instructions id for easy access.
var instructionsDiv = document.getElementById("instructions");
var hideDiv = true;
var checkedRadio1 = false;
var checkedRadio2 = false;
var selectionOneFilled = false;
var gameComplete = false;
var gameStarted = false;
var indexSelected;
var indexSelected2;
var sumExists = false;
var sum;

var className = document.getElementById("gameSection").getElementsByClassName(
  "instructions-text")[gameInstructions];


// --------------- EVENT LISTENERS ---------------
document.getElementById("gameOfNumbersButton").addEventListener("click", function () {
  // Future: Create a function that hide/shows the extra buttons/divs depending on state.
  showOrHideDiv("gameOfNumbers");
  setInputMaxMinValues("ownNumbers");
  gameInstructions = 0;
  document.getElementById("radio-own-numbers").checked = true;
  document.getElementById("checkNumberInputBtn").style.display = "inline-block";
  document.getElementById("clearNumbersBtn").style.display = "inline-block";
  document.getElementById("randomizeNumbersBtn").style.display = "none";
  if (!checkedRadio2.valueOf()) {
    clearFields();
  }
  checkedRadio1 = true;
  checkedRadio2 = false;
});

document.getElementById("radio-own-numbers").addEventListener("click", function () {
  // Future: Create a function that hide/shows the extra buttons/divs depending on state.
  if (!checkedRadio1.valueOf()) {
    clearFields();
    document.getElementById("randomizeNumbersBtn").style.display = "none";
    document.getElementById("clearNumbersBtn").style.display = "inline-block";
    document.getElementById("checkNumberInputBtn").style.display = "inline-block";
  }
  checkedRadio1 = true;
  checkedRadio2 = false;
});

document.getElementById("radio-random-numbers").addEventListener("click", function () {
  // Future: Create a function that hide/shows the extra buttons/divs depending on state.
  if (!checkedRadio2.valueOf()) {
    clearFields();
    randomizeNumbers();
    gameOfNumbers();
    document.getElementById("randomizeNumbersBtn").style.display = "inline-block";
    document.getElementById("clearNumbersBtn").style.display = "none";
    document.getElementById("checkNumberInputBtn").style.display = "none";
  }
  checkedRadio1 = false;
  checkedRadio2 = true;
});

document.getElementById("randomizeNumbersBtn").addEventListener("click", function () {
  randomizeNumbers();
  gameOfNumbers();

});

document.getElementById("checkNumberInputBtn").addEventListener("click", function () {
  checkNumbersAddToArray("ownNumbers", "input", "value");
  if (inputNotEmptyCheck()) {
    gameOfNumbers();
  }
});

document.getElementById("clearNumbersBtn").addEventListener("click", function () {
  clearFields();
});

document.getElementById("createSum").addEventListener("click", function () {
  var operatorSelected = document.getElementById("selectedMathSign").innerHTML;
  var numberSelectedOne = document.getElementById("selectedNumberOne").innerHTML;
  var numberSelectedTwo = document.getElementById("selectedNumberTwo").innerHTML;

  if(numberSelectedOne !== "0" && numberSelectedTwo !== "0") {
    if (operatorSelected === "+") {
      sum = parseInt(numberSelectedOne) + parseInt(numberSelectedTwo);
      console.log(numberSelectedOne);
      console.log(numberSelectedTwo);
    } else if (operatorSelected === "-") {
      sum = parseInt(numberSelectedOne) - parseInt(numberSelectedTwo);
    } else if (operatorSelected === "*") {
      sum = parseInt(numberSelectedOne) * parseInt(numberSelectedTwo);
    } else if (operatorSelected === "/") {
      sum = parseInt(numberSelectedOne) / parseInt(numberSelectedTwo);
    }

    var btnDisplay1 = getElement("numbersFromArray", "btn-select-number", indexSelected);
    var btnDisplay2 = getElement("numbersFromArray", "btn-select-number", indexSelected2);
    if (!sumExists) {
      numberListCopy.splice(indexSelected, 1);
      btnDisplay1.style.visibility = "hidden";
    }
    numberListCopy.splice(indexSelected2, 1);
    btnDisplay2.style.visibility = "hidden";
    sumExists = true;
    var sumOutput = document.getElementById("sumOutput");
    sumOutput.innerHTML = sum;
    document.getElementById("selectedNumberOne").innerHTML = sumOutput.innerHTML;
    document.getElementById("selectedNumberTwo").innerHTML = "0";
  }
  //console.log(numberList);
  //console.log(numberListCopy);
  if(numberListCopy.length == 1){
    if(sum === numberListCopy[0]){
      //Game Won!
      alert("You won!");
    }else{
      //Game Over!
      alert("Game over!");
    }
  }
});

/*
function removeFromDupArray(){
  // Get the value look for it in dup array, remove.
}
 */

document.getElementById("addNumber").addEventListener("click", function () {
  document.getElementById("selectedMathSign").innerHTML = "+";
});

document.getElementById("subtractNumber").addEventListener("click", function () {
  document.getElementById("selectedMathSign").innerHTML = "-";
});

document.getElementById("multiplyNumber").addEventListener("click", function () {
  document.getElementById("selectedMathSign").innerHTML = "*";
});

document.getElementById("divideNumber").addEventListener("click", function () {
  document.getElementById("selectedMathSign").innerHTML = "/";
});

var selectNumbers1 = document.getElementById("numbersFromArray").getElementsByClassName("btn-select-number")[0];
var selectNumbers2 = document.getElementById("numbersFromArray").getElementsByClassName("btn-select-number")[1];
var selectNumbers3 = document.getElementById("numbersFromArray").getElementsByClassName("btn-select-number")[2];
var selectNumbers4 = document.getElementById("numbersFromArray").getElementsByClassName("btn-select-number")[3];
var selectNumbers5 = document.getElementById("numbersFromArray").getElementsByClassName("btn-select-number")[4];
var selectNumbers6 = document.getElementById("numbersFromArray").getElementsByClassName("btn-select-number")[5];

selectNumbers1.addEventListener("click", function () {
  fillSelections(0)
});
selectNumbers2.addEventListener("click", function () {
  fillSelections(1)
});
selectNumbers3.addEventListener("click", function () {
  fillSelections(2)
});
selectNumbers4.addEventListener("click", function () {
  fillSelections(3)
});
selectNumbers5.addEventListener("click", function () {
  fillSelections(4)
});
selectNumbers6.addEventListener("click", function () {
  fillSelections(5)
});


function fillSelections(selectNumberIndex) {
  var numberDisplay = getElement("numbersFromArray", "submittedNumberDisplayed", selectNumberIndex);
  var selectedOne = document.getElementById("selectedNumberOne").innerHTML;
  var selectedTwo = document.getElementById("selectedNumberTwo").innerHTML;
  var displayInBox = "";

  if (!selectionOneFilled && indexSelected !== selectNumberIndex && indexSelected2 !== selectNumberIndex
    && !sumExists) {
    displayInBox = document.getElementById("selectedNumberOne");
    displayInBox.innerHTML = numberDisplay.innerHTML;
    indexSelected = selectNumberIndex;
    selectionOneFilled = true;
  } else if (indexSelected2 !== selectNumberIndex && indexSelected !== selectNumberIndex) {
    displayInBox = document.getElementById("selectedNumberTwo");
    displayInBox.innerHTML = numberDisplay.innerHTML;
    indexSelected2 = selectNumberIndex;
    selectionOneFilled = false;
  }
  numberDisplay.style.color = "grey";
  for (i = 0; i < numberList.length; i++) {
    var elementCheck = getElement("numbersFromArray", "submittedNumberDisplayed", i);
    var checkTextColour = elementCheck.innerHTML;
    if (displayInBox !== checkTextColour) {
      elementCheck.style.color = "black";
    } else {
      elementCheck.style.color = "grey";
    }
  }
}

// Upon mouse over instructions text is shown.
instructionsDiv.addEventListener("mouseover", function () {
  className.style.display = "block";
});
// When mouse moves off element instructions text returns to hidden.
instructionsDiv.addEventListener("mouseout", function () {
  className.style.display = "none";
});


// ----------------- Functions --------------------------


function showOrHideDiv(divName) {
  var divId = document.getElementById(divName);
  var gameDiv = document.getElementById("gameSection");
  if (hideDiv) {
    hideDiv = false;
    divId.style.display = "block";
    gameDiv.style.display = "block";
  } else {
    hideDiv = true;
    divId.style.display = "none";
    gameDiv.style.display = "none";
  }
}


function checkDuplicatesAndReplace(testedNumber, arrayName) {
  var checkedNumber = Number(testedNumber);

  arrayName.forEach(function (number) {
    checkedNumber = number === checkedNumber ? checkedNumber + 1 : checkedNumber;
  });
  testedNumber = checkedNumber;
  return testedNumber;
}

function randomizeNumbers() {
  numberList = [];
  for (i = 0; i < 6; i++) {
    var randomNumber = (Math.random() * 18) + 1;
    var roundedRandomNumber = Math.round(randomNumber);
    roundedRandomNumber = checkDuplicatesAndReplace(roundedRandomNumber, numberList);
    var iterateId = "number" + (i + 1);
    document.getElementById(iterateId).valueAsNumber = roundedRandomNumber;
    numberList[i] = roundedRandomNumber;
  }
}

function clearFields() {
  for (i = 0; i < 6; i++) {
    var elementIncorrectNum = getElement("ownNumbers", "incorrect-number", i);
    var elementDuplicate = getElement("ownNumbers", "duplicate-number", i);
    var iterateId = "number" + (i + 1);
    document.getElementById(iterateId).value = "";
    elementIncorrectNum.style.display = "none";
    elementDuplicate.style.display = "none";
    numberList = [];
    var numberDisplay = getElement("numbersFromArray", "submittedNumberDisplayed", i);
    numberDisplay.innerHTML = "";
    clearSelections();
  }
}

function clearSelections() {
  document.getElementById("selectedNumberOne").innerHTML = "0";
  document.getElementById("selectedNumberTwo").innerHTML = "0";
}

function checkNumbersAddToArray(divId, tagName, namedItem) {
  numberList = [];
  var findId = document.getElementById(divId);
  var nodeListLength = findId.getElementsByTagName(tagName).length;
  for (i = 0; i < nodeListLength; i++) {
    var elementIncorrectNum = getElement("ownNumbers", "incorrect-number", i);
    var elementDuplicate = getElement("ownNumbers", "duplicate-number", i);
    var iterateId = "number" + (i + 1);
    var idNumValue = document.getElementById(iterateId).value;
    idNumValue = idNumValue == undefined || idNumValue == "" ? idNumValue = 0 : idNumValue;
    var oldValue = idNumValue;
    idNumValue = checkDuplicatesAndReplace(idNumValue, numberList);
    if (idNumValue >= 1 && idNumValue <= 20) {
      if (oldValue != idNumValue) {
        // Future Ref: create functions that input text into class text .innerHTML =
        elementDuplicate.style.display = "inline-block";
        document.getElementById(iterateId).valueAsNumber = idNumValue;
      } else {
        // Future Ref: create functions that input text into class text .innerHTML =
        elementDuplicate.style.display = "none";
      }
      numberList[i] = idNumValue;
      // Future Ref: create functions that input text into class text .innerHTML =
      elementIncorrectNum.style.display = "none";
    } else {
      // Future Ref: create functions that input text into class text .innerHTML =
      elementIncorrectNum.style.display = "inline-block";
    }
  }
}

function getElement(divId, className, indexNum) {
  var classNameElement = document.getElementById(divId).getElementsByClassName(className)[indexNum];
  return classNameElement;
}

//This sets the min/max and value attributes when the button Game of Numbers is clicked.
function setInputMaxMinValues(divId) {
  var findId = document.getElementById(divId);
  for (i = 0; i < 6; i++) {
    var tagNameCheck = findId.getElementsByTagName("input")[i];
    var tagNamedItem = tagNameCheck.attributes.getNamedItem("type").value;
    if (tagNamedItem == "number") {

      tagNameCheck.setAttribute("placeholder", "1-20");
      tagNameCheck.setAttribute("min", "1");
      tagNameCheck.setAttribute("max", "20");
      tagNameCheck.setAttribute("maxlength", "2");
    }

  }
}

function inputNotEmptyCheck() {
  for (i = 0; i < numberList.length; i++) {
    var iterateId = "number" + (i + 1);
    var numberInput = document.getElementById(iterateId).value;
    empty = numberInput == "undefined" || numberInput == "";
    if (empty) {
      return false;
    }
  }
  return true;
}

function gameOfNumbers() {
  gameStarted = true;
  numberListCopy = numberList.slice();
  if (inputNotEmptyCheck()) {
    for (i = 0; i < numberList.length; i++) {
      var numberDisplay = getElement("numbersFromArray", "submittedNumberDisplayed", i);
      var iterateId = "number" + (i + 1);
      var numberInput = document.getElementById(iterateId).value;
      numberDisplay.innerHTML = numberInput;
    }
  }
}