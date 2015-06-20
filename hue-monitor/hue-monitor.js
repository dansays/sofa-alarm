//  ____         __        ____
// / ___|  ___  / _| __ _ / ___|__ _ _ __ ___
// \___ \ / _ \| |_ / _` | |   / _` | '_ ` _ \
//  ___) | (_) |  _| (_| | |__| (_| | | | | | |
// |____/ \___/|_|  \__,_|\____\__,_|_| |_| |_|
//
// Built using node-hue-api by Peter Murray
// https://github.com/peter-murray/node-hue-api

var HueApi        = require("node-hue-api").HueApi;
var Exec          = require("child_process").exec;
var Applescript   = require("applescript");

var host          = "192.168.104.165";
var username      = "3b7a821c083db83890e8f5a84a1eec32";
var api           = new HueApi(host, username);

var lightId       = 1;      // Task lamp
var checkInterval = 1000;   // Once every second
var camArmed      = false;  // Assume off on start

// Let's get this party started
queryLight();

// Query the Hue API for the status
function queryLight() {
	api.lightStatus(lightId)
		.then(checkStatus)
		.done(scheduleNextCheck);
}

// Schedule the next check
function scheduleNextCheck() {
	setTimeout(queryLight, checkInterval);
}

// Check to see whether the state has changed
function checkStatus(status) {
	var currentState = magicSetting(status);
	if (camArmed && !currentState) disarmCamera();
	if (!camArmed && currentState) armCamera();
}

// Check whether current setting matches the
// magic color/brightness setting
function magicSetting(status) {
	if (status.state.on      == false)  return false;
	if (status.state.bri    !== 230)    return false;
	if (status.state.xy[0]  !== 0.4675)	return false;
	if (status.state.xy[1]  !== 0.4142) return false;
	return true;
}

// Arm the camera
function armCamera() {
	var cmd = 'tell application "Finder" to open "Drobo:SofaCam:SofaCam.evocamsettings"';
	camArmed = true;
	Applescript.execString(cmd, function(err, rtn) {
		if (err) {
			say("Cannot arm SofaCam dammit");
			console.log(err);
		} else {
			say("SofaCam is now armed");
		}
	});
}

// Disarm the camera
function disarmCamera() {
	camArmed = false;
	var cmd = 'quit app "Evocam"';
	Applescript.execString(cmd, function(err, rtn) {
		if (err) {
			say("Cannot disarm SofaCam");
			console.log(err);
		} else {
			say("SofaCam is now disarmed");
		}
	});
}

function say(msg) {
	Exec("say -v Zarvox " + msg);
}
