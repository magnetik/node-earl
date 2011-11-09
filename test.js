var earl = require('../node-earl');

var earlDocument = new earl.EarlDocument();

earlDocument.addAssertion(":assert1", ":certificate", "wit:certificateProvidedSAN");

earlDocument.writeFile('test.txt');