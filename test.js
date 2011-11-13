var earl = require('../node-earl');

var earlDocument = new earl.EarlDocument();

// add wit prefix
earlDocument.setPrefix("wit", "http://purl.org/dc/terms/");

earlDocument.addAssertion(":assert1", ":certificate", "wit:certificateProvidedSAN").toRDF();

earlDocument.getAssertion(":assert1").addResult("earl:passed").toRDF();

earlDocument.writeFile('test.txt');