	// -------------- VARIABLES -----------------
	var gameInstructions = 0;
	var numberList = [];
		// Setting var for instructions id for easy access.
	var instructionsDiv = document.getElementById("instructions");
	var hideDiv = true;
    var checkedRadio1 = false;
    var checkedRadio2 = false;

	var className = document.getElementById("gameSection").getElementsByClassName(
		"instructions-text")[gameInstructions];
	

	// --------------- EVENT LISTENERS ---------------
	document.getElementById("gameOfNumbersButton").addEventListener("click", function() {
        // Future: Create a function that hide/shows the extra buttons/divs depending on state.
		showOrHideDiv("gameOfNumbers");
		setInputMaxMinValues("ownNumbers");
		gameInstructions = 0;
		document.getElementById("radio-own-numbers").checked = true;
        document.getElementById("checkNumberInputBtn").style.display = "inline-block";
        document.getElementById("clearNumbersBtn").style.display = "inline-block";
        document.getElementById("randomizeNumbersBtn").style.display = "none";
        if(!checkedRadio2.valueOf()) {
            clearFields();
        }
        checkedRadio1 = true;
        checkedRadio2 = false;
	});

	document.getElementById("radio-own-numbers").addEventListener("click", function() {
        // Future: Create a function that hide/shows the extra buttons/divs depending on state.
		if(!checkedRadio1.valueOf()) {
            clearFields();
            document.getElementById("randomizeNumbersBtn").style.display = "none";
            document.getElementById("clearNumbersBtn").style.display = "inline-block";
            document.getElementById("checkNumberInputBtn").style.display = "inline-block";

        }
        checkedRadio1 = true;
        checkedRadio2 = false;

	})

    document.getElementById("radio-random-numbers").addEventListener("click", function() {
        // Future: Create a function that hide/shows the extra buttons/divs depending on state.
        if(!checkedRadio2.valueOf()) {
            clearFields();
            randomizeNumbers();
            document.getElementById("randomizeNumbersBtn").style.display = "inline-block";
            document.getElementById("clearNumbersBtn").style.display = "none";
            document.getElementById("checkNumberInputBtn").style.display = "none";

        }

        checkedRadio1 = false;
        checkedRadio2 = true;
    })

    document.getElementById("randomizeNumbersBtn").addEventListener("click", function() {
        console.clear();
        randomizeNumbers();
    })

	// Upon mouse over instructions text is shown.
	instructionsDiv.addEventListener("mouseover", function() {
		className.style.display = "block";
	})
	// When mouse moves off element instructions text returns to hidden.
	instructionsDiv.addEventListener("mouseout", function() {
		className.style.display = "none";
	})

	document.getElementById("checkNumberInputBtn").addEventListener("click", function() {
		checkNumbersAddToArray("ownNumbers", "input", "value");
	})

	


	// ----------------- Functions --------------------------


	function showOrHideDiv(divName){
		var divId = document.getElementById(divName);
		var gameDiv = document.getElementById("gameSection");
		if(hideDiv){
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
        arrayName.forEach(function (number){
            checkedNumber = number == checkedNumber ? checkedNumber + 1 : checkedNumber;
        });
        testedNumber = checkedNumber;
        return testedNumber;
    }

	function randomizeNumbers() {
        numberList = [];
		for(i = 0; i < 6; i++){
			var randomNumber = (Math.random()*18) + 1;
            var roundedRandomNumber = Math.round(randomNumber);
            roundedRandomNumber = checkDuplicatesAndReplace(roundedRandomNumber, numberList);
            var iterateId = "number" + (i + 1);
            document.getElementById(iterateId).valueAsNumber = roundedRandomNumber;
            numberList[i] = roundedRandomNumber;
		}
	}

    function clearFields() {
        for(i = 0; i < 6; i++) {
            var elementIncorrectNum = getElement("ownNumbers", "incorrect-number", i);
            var elementDuplicate = getElement("ownNumbers", "duplicate-number",i);
            var iterateId = "number" + (i + 1);
            document.getElementById(iterateId).value = "";
            elementIncorrectNum.style.display = "none";
            elementDuplicate.style.display = "none";
            numberList = [];
        }
    }

	function checkNumbersAddToArray(divId, tagName, namedItem) {
        numberList = [];
		var findId = document.getElementById(divId);
		var nodeListLength = findId.getElementsByTagName(tagName).length;
		for(i = 0; i < nodeListLength; i++) {
			var elementIncorrectNum = getElement("ownNumbers", "incorrect-number", i);
            var elementDuplicate = getElement("ownNumbers", "duplicate-number",i);
			var iterateId = "number" + (i+1);
            var idNumValue = document.getElementById(iterateId).value;
            idNumValue = idNumValue == undefined || idNumValue == "" ? idNumValue = 0 : idNumValue;
            var oldValue = idNumValue;
            idNumValue = checkDuplicatesAndReplace(idNumValue, numberList);
			if(idNumValue >= 1 && idNumValue <= 20){
                if(oldValue != idNumValue){
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

	function getElement(divId, className, indexNum){
		var classNameElement = document.getElementById(divId).getElementsByClassName(
		className)[indexNum];
		return classNameElement;
	}

	//This sets the min/max and value attributes when the button Game of Numbers is clicked.
	function setInputMaxMinValues(divId) {
		var findId = document.getElementById(divId);
		for(i = 0; i < 6; i++){
			var tagNameCheck = findId.getElementsByTagName("input")[i];
			var tagNamedItem = tagNameCheck.attributes.getNamedItem("type").value;
			if(tagNamedItem == "number"){

				tagNameCheck.setAttribute("placeholder", "1-20");
				tagNameCheck.setAttribute("min", "1");
				tagNameCheck.setAttribute("max", "20");
				tagNameCheck.setAttribute("maxlength", "2");
			}

		}
	}

	function gameOfNumbers() {

	}