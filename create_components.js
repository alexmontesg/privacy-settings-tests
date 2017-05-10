/*
 write_advanced();
 $(".advanced").toggle();

 $(".advanced-btn").on("click", function() {
 $(".advanced").toggle();
 var rotation = 0;
 if($(".advanced").is(":visible")) {
 rotation = 180;
 }
 $(".advanced-btn .caret").css("transform", "rotate(" + rotation + "deg)");
 });
 */

var component_creator = (function() {
	var instance;
	var VARIABLES = {
		"History" : {
			"Login page" : 5,
			"Videogames" : 2,
			"Movies" : 5,
			"Books" : 10
		},
		"Demographic" : {
			"Gender" : "Female",
			"Age" : 28,
			"Nationality" : "North Korean",
			"Last connection" : "Pyongyang",
			"Usually online" : "Afternoon"
		},
		"Ratings" : {
			"Star Wars" : 3,
			"To kill a Mockingbird" : 2,
			"Harry Potter" : 3,
			"Fifa 17" : 1,
			"Anecdotes of Kim Jong Il" : 5
		},
		"Financial" : {
			"Yearly income" : 30000,
			"Budget for presents" : 20,
			"Budget for self present" : 500
		}
	};
	var TYPES_VARIABLES = Object.keys(VARIABLES).length;
	var MAX_SLIDER = TYPES_VARIABLES + 1;
	var DEFAULT_SLIDER = 1;
	var EXPLANATIONS = ["No data about you is tracked", "All data is stored on your computer", "All data is stored on your computer, except your browsing history within this page, which will be shared with the server", "All data is stored on your computer, except your browsing history within this page and demographic information, which will be shared with the server", "All information will be sent to the server except your financial data", "All information is sent to the server"];

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

	function addEventToElement(element, trigger, event) {
		element.addEventListener(trigger, event);
	}

	function createSlider() {
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
			document.getElementById("privacyExplanation").innerText = EXPLANATIONS[this.value];
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
			"id" : "privacyExplanation"
		}, EXPLANATIONS[DEFAULT_SLIDER]));
		return container;
	}

	function createSwitch() {
		var container = createElement("div", {
			"class" : "switch-container row"
		});
		var paragraph = document.createElement("p");
		var i_switch = createElement("label", {
			"class" : "switch"
		});
		i_switch.appendChild(createElement("input", {
			"type" : "checkbox"
		}));
		i_switch.appendChild(createElement("div", {
			"class" : "switch-slider round"
		}));
		paragraph.appendChild(i_switch);
		container.appendChild(createElement("p", {
			"id" : "switchExplanation"
		}, "Send data to server"));
		container.appendChild(paragraph);
		return container;
	}

	function createTable() {
		var container = createElement("div", {
			"class" : "table-container row"
		});
		for (var i = 0; i < TYPES_VARIABLES; i++) {
			var key = Object.keys(VARIABLES)[i];
			var div = createElement("div", {
				"class" : "col-3"
			});
			div.appendChild(createElement("h3", {}, key));
			var ul = createElement("ul", {
				"class" : "um_itemlist"
			});
			for (var j = 0; j < Object.keys(VARIABLES[key]).length; j++) {
				var item = Object.keys(VARIABLES[key])[j];
				var value = VARIABLES[key][item];
				var li = createElement("li");
				li.appendChild(createElement("input", {
					"type" : "checkbox",
					"id" : "checkbox_" + key
				}));
				li.appendChild(createElement("label", {
					"for" : "checkbox_" + key
				}, item + ": " + value));
				ul.appendChild(li);
			}
			div.appendChild(ul);
			container.appendChild(div);
		}
		return container;
	}

	function createInstance() {
		return {
			createSlider : createSlider,
			createSwitch : createSwitch,
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