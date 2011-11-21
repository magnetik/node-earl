var earl = require('./node-earl');

var earlWebid = function() {
    this.Document = new earl.EarlDocument();
    // Adding namespace
    this.Document.setPrefix("wit", "http://purl.org/dc/terms/");
    
    // Initialise tests
    this.Document.addAssertion(":assert1", ":certificate", "wit:certificateProvided", ":result1").toRDF();
    

};
earlWebid.prototype.certificateProvided = function(result) {
    if (result) { this.Document.getAssertion(":assert1").passed(); }
    else { this.Document.getAssertion(":assert1").failed(); }
}

// Expose class to the world
exports.earlWebid = earlWebid;