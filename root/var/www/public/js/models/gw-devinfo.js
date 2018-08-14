define(function(require) {
    
    var BaseModel = require('models/model-base');
    
    /********************************/
    
    return BaseModel.extend({
        
        urlRoot: 'gw',
        
        initialize: function() {
            
        },
        
        defaults: {
            function_name: null,
            notes: null,
            ticket_number: null,
            multiplier: 1
        },
        
        /********************************/
        
    });
    
});