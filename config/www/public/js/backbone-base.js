/**
* Base object with defaults to be extended by any needed Backbone objects 
*/

define(function(require) {
    
    var Backbone = require('backbone');
    
    /********************************/
    
    var backboneSync = Backbone.sync;
    Backbone.sync = function (method, model, options) {
        options = _.extend(options, {
            url: '/api/' + _.result(model, 'url')
        });
        backboneSync(method, model, options);
    };
    
    return Backbone;
    
});