define(function(require) {
    
    var Base = require('app/backbone-base');
    
    /********************************/
    return Base.Model.extend({
        
        // fetch: function(options) {
        //     var self = this;
        //     this.loaded = false;
        //     this.deferred = Base.Model.prototype.fetch.call(this, options);
        //     this.deferred.done(function() {
        //         self.loaded = true;
        //     });
        //     return this.deferred;
        // },
        
        /********************************/

        gwFetch: function() {
            return;
        },
        
    });
    
});