define(function(require) {
    
    var BaseModel = require('models/model-base');
    
    /********************************/
    
    return BaseModel.extend({
        
        urlRoot: 'config',
        
        initialize: function() {
            
        },
        
        defaults: {
            cam_count: null,
            cam_names: [],
            sensor_count: null,
            root: null
        },
        
        /********************************/
        
    });
    
});