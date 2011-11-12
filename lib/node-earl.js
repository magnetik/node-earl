var fs = require('fs'); 
var rdfstore = require('./rdfstore');

/**
 * Class representing an EARL document
 * @constructor
 */
var EarlDocument = function () {
  // Initialise rdf store
  this.store = new rdfstore.Store();
  this.graph = this.store.rdf.createGraph();
  
  /**
   * List of assertions of the EARL document
   */
  this.assertions = new Object();
  
  // Set general prefixs
  this.store.rdf.setPrefix("earl", "http://www.w3.org/ns/earl#");
  this.store.rdf.setPrefix("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
  this.store.rdf.setPrefix("dct", "http://purl.org/dc/terms/");
  
  // Can be used to add other prefixs
  this.setPrefix = function(prefix, url) {
      this.store.rdf.setPrefix(prefix, url);
  }
};
/**
 * Add a triple to the RDF document
 * @param {String} subject the subject of the RDF triple
 * @param {String} predicate the predicate of the RDF triple
 * @param {String} object the object ot the RDF triple
 */
EarlDocument.prototype.addTriple = function (subject, predicate, object) {
    this.graph.add(this.store.rdf.createTriple(subject, predicate, object));
}
/**
 * Add an assertion
 * @param {String} identifier Unique string which identify the assertion
 * @param {String} subject of the assertion
 * @param {String} test name of the tests
 */
EarlDocument.prototype.addAssertion = function(identifier, subject, test) {
    return this.assertions[identifier] = new EarlAssertion(this, identifier, subject, test);
};

/**
 * Return an assertion given by parameter
 * @param {String} identifier
 * @returns EarlAssertion
 */
EarlDocument.prototype.getAssertion = function(identifier) {
    return this.assertions[identifier];
};

/**
 * Write the EARL document to an N3 file on the disk
 * @param {String} file the file to be wrote on the disk (extension included)
 */
EarlDocument.prototype.writeFile = function(file) {
  var n3file = this.graph.toNT();
  fs.open(file, 'w+', 666, function( e, id ) {
    fs.write( id, n3file, null, 'utf8', function(){
      fs.close(id, function(){
        console.log('File (' + file + ') wrote on the disk');
      });
    });
  });
};

/**
 * @constructor
 */
var EarlAssertion = function(Document, identifier, subject, test) {
  // Will be used to save the reference of the EarResult (aggregation)
  this.Document = Document;
  
  this.result = Object();
  this.identifier = identifier;
  this.subject = subject;
  this.test = test;
};

EarlAssertion.prototype.addResult = function(outcome) {
    this.result = new EarlResult(this,outcome);
}

EarlAssertion.prototype.toRDF = function() {
  this.Document.addTriple(  this.Document.store.rdf.createNamedNode(this.Document.store.rdf.resolve(this.identifier)),
                            this.Document.store.rdf.createNamedNode(this.Document.store.rdf.resolve("rdf:type")),
                            this.Document.store.rdf.createNamedNode(this.Document.store.rdf.resolve("earl:Assertion")) );

  this.Document.addTriple(  this.Document.store.rdf.createNamedNode(this.Document.store.rdf.resolve(this.identifier)),
                            this.Document.store.rdf.createNamedNode(this.Document.store.rdf.resolve("earl:subject")),
                            this.Document.store.rdf.createNamedNode(this.Document.store.rdf.resolve(this.subject)) );

  this.Document.addTriple(  this.Document.store.rdf.createNamedNode(this.Document.store.rdf.resolve(this.identifier)),
                            this.Document.store.rdf.createNamedNode(this.Document.store.rdf.resolve("earl:test")),
                            this.Document.store.rdf.createNamedNode(this.Document.store.rdf.resolve(this.test)) );
                              
  console.log("Assertion " + this.identifier + " saved into the RDF graph");
};
/**
 * @constructor
 */
var EarlResult = function(EarlAssertion, outcome) {
    this.Assertion = EarlAssertion;
    this.identifier = EarlAssertion.identifier + "Result";
    this.outcome = outcome;
};
/**
 * Save the EarlResult to the rdf graph
 */
EarlResult.prototype.toRDF = function() {
    EarlAssertion.Document.addTriple( EarlAssertion.Document.store.rdf.createNamedNode(EarlAssertion.Document.store.rdf.resolve(EarlAssertion.identifier)),
																	    EarlAssertion.Document.store.rdf.createNamedNode(EarlAssertion.Document.store.rdf.resolve("earl:result")),
																	    EarlAssertion.Document.store.rdf.createNamedNode(EarlAssertion.Document.store.rdf.resolve(this.identifier)) );

    EarlAssertion.Document.addTriple( EarlAssertion.Document.store.rdf.createNamedNode(EarlAssertion.Document.store.rdf.resolve(this.identifier)),
																	    EarlAssertion.Document.store.rdf.createNamedNode(EarlAssertion.Document.store.rdf.resolve("rdf:type")),
																	    EarlAssertion.Document.store.rdf.createNamedNode(EarlAssertion.Document.store.rdf.resolve("earl:TestResult")) );

    EarlAssertion.Document.addTriple( EarlAssertion.Document.store.rdf.createNamedNode(EarlAssertion.Document.store.rdf.resolve(this.identifier)),
																    EarlAssertion.Document.store.rdf.createNamedNode(EarlAssertion.Document.store.rdf.resolve("earl:outcome")),
																    EarlAssertion.Document.store.rdf.createNamedNode(EarlAssertion.Document.store.rdf.resolve(this.outcome)) );
};

// Exposing public functions
exports.EarlDocument = EarlDocument;
exports.EartAssertion = EarlAssertion;
exports.EartResult = EarlResult;