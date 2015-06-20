var Service = require('node-mac').Service;

// Create a new service object
var svc = new Service({
  name: 'SofaCam',
  description: 'EvoCam process to monitor couch',
  script: '/users/dansays/node_apps/monitor-hue.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function() {
  svc.start();
});

svc.install();
