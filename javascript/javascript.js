	/* Event listeners */
	var gameInstructions = 0;
	var numberList = [];
		// Setting var for instructions id for easy access.
	var instructionsDiv = document.getElementById("instructions");
	var hideDiv = true;

	var className = document.getElementById("gameSection").getElementsByClassName(
		"instructions-text")[gameInstructions];
	

	document.getElementById("gameOfNumbersButton").addEventListener("click", function() {
		showOrHideDiv("gameOfNumbers");
		setInputMaxMinValues("ownNumbers");
		gameInstructions = 0;
	});


	// Upon mouse over instructions text is shown.
	instructionsDiv.addEventListener("mouseover", function() {
		className.style.display = "block";
	})
	// When mouse moves off element instructions text returns to hidden.
	instructionsDiv.addEventListener("mouseout", function() {
		className.style.display = "none";
	})

	document.getElementById("checkNumberInput").addEventListener("click", function() {
		checkNumbersAddToArray("ownNumbers", "input", "value");
	})

	


	/* Functions */


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

	/*
	function checkNumbers() {
		if(getTagNameValue("ownNumbers", "input", "value")){

		}

	}
	*/

	function checkNumbersAddToArray(divId, tagName, namedItem) {
		var findId = document.getElementById(divId);
		var nodeList = findId.getElementsByTagName(tagName).length;
		for(i = 0; i < nodeList; i++) {

			var element = getElement("ownNumbers", "incorrect-number", i);
			var iterateId = "number" + (i+1);
			var idNumValue = document.getElementById(iterateId).value;

			if(idNumValue >= 1 && idNumValue <= 20){
				numberList[i] = idNumValue;
				element.style.display = "none";
			} else {
				element.style.display = "block";
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
				tagNameCheck.setAttribute("value", "1");
				tagNameCheck.setAttribute("min", "1");
				tagNameCheck.setAttribute("max", "20");
				tagNameCheck.setAttribute("maxlength", "2");
			}

		}
	}

	function gameOfNumbers() {

	}