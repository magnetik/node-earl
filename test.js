var earl = require('../node-earl');

var e = new earl.Earl();

e.setPrefix("wit", "http://www.w3.org/2005/Incubator/webid/earl/RelyingParty#");

e.addAssertion(":assert1", ":certificate", "wit:certificateProvidedSAN", ":result1");

e.writeFile("test.txt");