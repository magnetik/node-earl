var earl = require('./node-earl');

var earlWebid = function() {
    this.document = new earl.EarlDocument();
    // Adding namespace
    this.document.setPrefix("wit", "http://purl.org/dc/terms/");
    
    // Initialise tests
    this.document.addAssertion(":assert1", ":certificate", "wit:certificateProvided", ":result1").toRDF();
    

};
earlWebid.prototype.certificateProvided = function(result) {
    if (result) { this.document.getAssertion(":assert1").passed(); }
    else { this.document.getAssertion(":assert1").failed(); }
}

// Expose class to the world
exports.earlWebid = earlWebid;