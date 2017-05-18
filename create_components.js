var component_creator = (function() {
	var instance;
	var VARIABLES = {
		"History" : {
			"Login_page" : 5,
			"Videogames" : 2,
			"Movies" : 5,
			"Books" : 10
		},
		"Demographic" : {
			"Gender" : "Female",
			"Age" : 28,
			"Nationality" : "North_Korean",
			"Last_connection" : "Pyongyang",
			"Usually_online" : "Afternoon"
		},
		"Ratings" : {
			"Star_Wars" : 3,
			"To_kill_a_Mockingbird" : 2,
			"Harry Potter" : 3,
			"Fifa_17" : 1,
			"Anecdotes_of_Kim_Jong_Il" : 5
		},
		"Financial" : {
			"Yearly_income" : 30000,
			"Budget_for presents" : 20,
			"Budget_for_self_present" : 500
		}
	};
	var TYPES_VARIABLES = Object.keys(VARIABLES).length;
	var MAX_SLIDER = TYPES_VARIABLES + 1;
	var DEFAULT_SLIDER = 1;
	var EXPLANATIONS = ["No data about you is tracked", "All data is stored on your computer", "All data is stored on your computer, except your browsing history within this page, which will be shared with the server", "All data is stored on your computer, except your browsing history within this page and demographic information, which will be shared with the server", "All information will be sent to the server except your financial data", "All information is sent to the server"];
	var SWITCH_EXPLANATIONS = ["Track data and store it in your computer", "Send browsing history to the server", "Send demographic information to the server", "Send ratings to the server", "Send financial information to the server"];

	function createElement(tag, attributes, text) {
		var element = document.createElement(tag);
		for (key in attributes) {
			element.setAttribute(key, attributes[key]);
		}
		if (text) {
			element.innerText = text;
		}
		return element;
	}
	
	function checkBoxParentBehaviour(checkboxes) {
		var checkboxes = document.querySelectorAll("[data-parent=" + checkboxes + "]");
		for(var i = 0; i < checkboxes.length; i++) {
			checkboxes[i].checked = !checkboxes[i].checked;
		}
	}
	
	function toggleAdvanced() {
		var cols = document.getElementById(arguments[0]).getElementsByClassName("dropdown")[0].getElementsByClassName("col-3");
		var visibility = document.getElementById(arguments[0]).getElementsByClassName("dropdown")[0].getElementsByClassName("col-3")[0].style.display == "block";
		if(visibility) {
			document.getElementById(arguments[0]).getElementsByClassName("dropdown")[0].getElementsByClassName("arrow-up")[0].className = "arrow-down";
			for(var i = 0; i < cols.length; i++) {
				cols[i].style.display = "none";
			}
		} else {
			document.getElementById(arguments[0]).getElementsByClassName("dropdown")[0].getElementsByClassName("arrow-down")[0].className = "arrow-up";
			for(var i = 0; i < cols.length; i++) {
				cols[i].style.display = "block";
			}
		}
	}

	function addEventToElement(element, trigger, event) {
		var args = arguments[3];
		element.addEventListener(trigger, function() {
			event(args);
		});
	}
	
	function addDomainVariablesToTable(key) {
		var ul = createElement("ul", {
			"class" : "um_itemlist"
		});
		for (var i = 0; i < Object.keys(VARIABLES[key]).length; i++) {
			var item = Object.keys(VARIABLES[key])[i];
			var value = VARIABLES[key][item];
			var li = createElement("li");
			li.appendChild(createElement("input", {
				"type": "checkbox",
				"class": "checkbox_" + item,
				"data-parent": "checkbox_" + key
			}));
			li.appendChild(createElement("label", {
				"for" : "checkbox_" + item
			}, item + ": " + value));
			ul.appendChild(li);
		}
		return ul;
	}
	
	function addDomainsToTable(dropdown) {
		for (var i = 0; i < TYPES_VARIABLES; i++) {
			var key = Object.keys(VARIABLES)[i];
			var div = createElement("div", {
				"class": "col-3",
				"style": "display:none;"
			});
			var checkbox = createElement("input", {
				"type": "checkbox",
				"class": "checkbox_parent checkbox_" + key
			});
			addEventToElement(checkbox, "click", checkBoxParentBehaviour, "checkbox_" + key);
			div.appendChild(checkbox);
			div.appendChild(createElement("label", {
				"for": "checkbox_" + key,
				"class": "label_parent"
			}, key));
			div.appendChild(addDomainVariablesToTable(key));
			dropdown.appendChild(div);
		}
	}

	function createSlider(view) {
		var container = createElement("div", {
			"class" : "slider-container row"
		});
		var ticks = createElement("p", {
			"class" : "ticks"
		});
		for (var i = 0; i < TYPES_VARIABLES; i++) {
			ticks.appendChild(createElement("span", {
				"class" : "tick"
			}, "|"));
			container.appendChild(ticks);
		}
		var paragraph = document.createElement("p");
		var slider = createElement("input", {
			"type" : "range",
			"max" : MAX_SLIDER,
			"value" : 1
		});
		addEventToElement(slider, "change", function() {
			document.getElementById(view).getElementsByClassName("privacyExplanation")[0].innerText = EXPLANATIONS[slider.value];
		});
		paragraph.appendChild(createElement("span", {
			"class" : "slider beginning-slider"
		}, "Privacy"));
		paragraph.appendChild(slider);
		paragraph.appendChild(createElement("span", {
			"class" : "slider end-slider"
		}, "Personalization"));
		container.appendChild(paragraph);
		container.appendChild(createElement("p", {
			"class" : "privacyExplanation"
		}, EXPLANATIONS[DEFAULT_SLIDER]));
		return container;
	}
	
	function createSwitchs(view) {
		var container = createElement("div", {
			"class" : "switchs-container row"
		});
		for(var i = 0; i < SWITCH_EXPLANATIONS.length; i++) {
			container.appendChild(createSwitch(view, SWITCH_EXPLANATIONS[i]));
		}
		return container;
	}

	function createSwitch(view, label) {
		var container = createElement("div", {
			"class" : "switch-container row"
		});
		var i_switch = createElement("label", {
			"class" : "switch"
		});
		i_switch.appendChild(createElement("input", {
			"type" : "checkbox"
		}));
		i_switch.appendChild(createElement("div", {
			"class" : "switch-slider round"
		}));
		var paragraph = createElement("p", {
			"class" : "switch-p"
		});
		var span = createElement("span", {
			"class" : "switchExplanation"
		}, label);
		paragraph.appendChild(span);
		paragraph.appendChild(i_switch);
		container.appendChild(paragraph);
		return container;
	}

	function createTable(view) {
		var container = createElement("div", {
			"class": "table-container row"
		});
		var dropdown = createElement("div", {
			"class": "dropdown"
		});
		var button = createElement("button", {
			"class": "advanced_button"
		}, "Advanced Settings");
		button.appendChild(createElement("span", {
			"class": "arrow-down"
		}));
		addEventToElement(button, "click", toggleAdvanced, view);
		dropdown.appendChild(button);
		addDomainsToTable(dropdown);
		container.appendChild(dropdown);
		return container;
	}

	function createInstance() {
		return {
			createSlider : createSlider,
			createSwitchs : createSwitchs,
			createTable : createTable
		};
	}

	return {
		getInstance : function() {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		}
	};
})(); 