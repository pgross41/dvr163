/**
* Essentially just a place for global view functions
*/

define(function(require) {
    
    var Base = require('app/backbone-base');
    var spinnerTemplate = require ('text!html/lds-ring.html');
    
    /********************************/
    
    return Base.View.extend({
        
        /********************************/
        
        getLoadingSpinner: function(){
             return spinnerTemplate;
        },

        getResponseError(responseObj){
            var obj = responseObj.responseJSON || {};
            var text = obj.message ||obj.error;
            return text;
        },
        
    });
    
});