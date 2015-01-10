var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var data = require("sdk/self").data;
var newsResponse = "";
var button = ToggleButton({
  id: "puskice-fon",
  label: "Puškice FON",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: handleChange
});

var panel = panels.Panel({
  contentURL: data.url("popup.html"),
  contentScriptFile: [data.url("jquery-2.0.3.min.js"), data.url("content.js")],
  onHide: handleHide,
  position: button,
  width: 455,
  height: 400,
});

function handleChange(state) {
  if (state.checked) {
  	var Request = require("sdk/request").Request;
	var news = Request({
	  url: "https://api.puskice.org/news/",
	  onComplete: function (response) {
	  	newsResponse = response.json;
		panel.port.emit("newsResponse", newsResponse);
	  }
	});
	news.get();
	panel.show();
  }
}

function handleHide() {
  button.state('window', {checked: false});
} 

/*function handleClick(state) {
	var data = require("sdk/self").data;
  	var panel = require("sdk/panel").Panel({
		width: 400,
		height: 180,
		position: {
		    top: 0,
		    right: 50,
		},
		contentScriptFile: [data.url("jquery-2.0.3.min.js"), data.url("content.js")],
	  	contentURL: data.url("popup.html")
	});

	panel.show();
}*/
