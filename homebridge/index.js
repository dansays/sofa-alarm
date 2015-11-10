var Service;
var Characteristic;

var applescript = require('applescript');


module.exports = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	homebridge.registerAccessory('homebridge-sofacam', 'SofaCam', SofaCamAccessory);
}

function SofaCamAccessory(log, config) {
	this.log = log;
	this.name = config['name'];
	this.scriptPath = config['scriptPath'] || 'Drobo:SofaCam:SofaCam.evocamsettings';
	this.service = 'Switch';
}

SofaCamAccessory.prototype.setState = function(powerOn, callback) {
	var accessory = this;

	if (powerOn) {
		applescript.execString('tell application "Finder" to open "' + this.scriptPath + '"', done);
	} else {
		applescript.execString('quit app "Evocam"', done);
	}

	function done(err, rtn) {
		var state = powerOn ? 'on' : 'off';

		if (err) {
			accessory.log('Error: ' + err);
			callback(err || new Error('Error setting SofaCam to ' + state));
		} else {
			accessory.log('Set SofaCam to ' + state);
			callback(null);
		}
	}
}

SofaCamAccessory.prototype.getServices = function() {
	var informationService = new Service.AccessoryInformation();
	var switchService = new Service.Switch(this.name);

	informationService
		.setCharacteristic(Characteristic.Manufacturer, 'BetaCam Enterprises')
		.setCharacteristic(Characteristic.Model, 'CouchGuard 9000')
		.setCharacteristic(Characteristic.SerialNumber, 'TK421');

	switchService
		.getCharacteristic(Characteristic.On)
		.on('set', this.setState.bind(this));

	return [switchService];
}