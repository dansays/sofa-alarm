var Service;
var Characteristic;

var request = require('request');


module.exports = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	homebridge.registerAccessory('homebridge-sofacam', 'SofaCam', SofaCamAccessory);
}

function SofaCamAccessory(log, config) {
	this.log = log;
	this.name = config['name'];
	this.service = 'Switch';
}

SofaCamAccessory.prototype.setState = function(powerOn, callback) {
	if (powerOn) {
		this.log('Setting SofaCam to on');
	} else {
		this.log('Setting SofaCam to off');
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