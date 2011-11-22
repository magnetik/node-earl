Node.js module to help producing EARL (http://www.w3.org/WAI/intro/earl) reports.

Documentation is available here : http://magnetik.github.com/node-earl/doc/

Example :
```
var earl = require('../node-earl');
// Creating EARL document
var earlDocument = new earl.EarlDocument();
// add wit prefix
earlDocument.setPrefix("wit", "http://purl.org/dc/terms/");
// Create an assertion
earlDocument.addAssertion(":assert1", ":certificate", "wit:certificateProvidedSAN");
// Tells that this assertion is ok
earlDocument.getAssertion(":assert1").passed();
// Save the RDF data to the files
earlDocument.writeFile('test.txt');
```
is producing :
```
<assert1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/ns/earl#Assertion> . 
<assert1> <http://www.w3.org/ns/earl#subject> <certificate> . 
<assert1> <http://www.w3.org/ns/earl#test> <http://purl.org/dc/terms/certificateProvidedSAN> . 
<assert1> <http://www.w3.org/ns/earl#result> <assert1Result> . 
<assert1Result> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/ns/earl#TestResult> . 
<assert1Result> <http://www.w3.org/ns/earl#outcome> <http://purl.org/dc/terms/passed> . 
```

Any help is welcome !