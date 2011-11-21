var earl = require('./lib/earl-webid.js');

var earlWebID = new earl.earlWebid();

earlWebID.certificateProvided(true);

earlWebID.Document.writeFile('test.txt');