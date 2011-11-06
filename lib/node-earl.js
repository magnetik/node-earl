var fs = require('fs'); 
var rdfstore = require('./rdfstore');

exports.Earl = function () {
	// Initialise rdf store
	var store = new rdfstore.Store();
	var graph = store.rdf.createGraph();
	
	// Set general prefixs
	store.rdf.setPrefix("earl", "http://www.w3.org/ns/earl#");
	store.rdf.setPrefix("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
	store.rdf.setPrefix("dct", "http://purl.org/dc/terms/");
	
	// Can be used to add other prefixs
	this.setPrefix = function(prefix, url) {
	    store.rdf.setPrefix(prefix, url);
	}
	
	// Add a triple to the graph
	this.addTriple = function (subject, predicate, object) {
	    graph.add(store.rdf.createTriple(subject, predicate, object));
	}
	
	// Add an assertion to the graph
	this.addAssertion = function(id, subject, test, result) {
		this.addTriple(	store.rdf.createNamedNode(store.rdf.resolve(id)),
										store.rdf.createNamedNode(store.rdf.resolve("rdf:type")),
										store.rdf.createNamedNode(store.rdf.resolve("earl:Assertion")) );
		
		this.addTriple(	store.rdf.createNamedNode(store.rdf.resolve(id)),
										store.rdf.createNamedNode(store.rdf.resolve("earl:subject")),
										store.rdf.createNamedNode(store.rdf.resolve(subject)) );
		
		this.addTriple(	store.rdf.createNamedNode(store.rdf.resolve(id)),
										store.rdf.createNamedNode(store.rdf.resolve("earl:test")),
										store.rdf.createNamedNode(store.rdf.resolve(test)) );
		
		this.addTriple(	store.rdf.createNamedNode(store.rdf.resolve(id)),
										store.rdf.createNamedNode(store.rdf.resolve("earl:result")),
										store.rdf.createNamedNode(store.rdf.resolve(result)) );
	}

	// Add a result for an assertion to the graph
	this.addResult = function(id, outcome) {
		this.addTriple(	store.rdf.createNamedNode(store.rdf.resolve(id)),
										store.rdf.createNamedNode(store.rdf.resolve("rdf:type")),
										store.rdf.createNamedNode(store.rdf.resolve("earl:TestResult")) );
		
		this.addTriple(	store.rdf.createNamedNode(store.rdf.resolve(id)),
										store.rdf.createNamedNode(store.rdf.resolve("earl:outcome")),
										store.rdf.createNamedNode(store.rdf.resolve(outcome)) );
	}
	
	this.writeFile = function(file) {
		fs.open(file, 'w+', 666, function( e, id ) {
			fs.write( id, graph.toNT(), null, 'utf8', function(){
				fs.close(id, function(){
					console.log('File (' + file + ') wrote');
				});
			});
		});
	};
}