define(function(require){
    
    var Backbone = require('app/backbone-base');
    
    /********************************/
    
    return Backbone.Router.extend({
        
        initialize: function(app){
            
            this.app = app;
            
        },
        
        routes: {
            'home': 'loadTab',
            'live': 'loadTab',
            'recorded': 'loadTab',
        },
        
        /********************************/
        
        // Can't do this in "initialize" because nothing is rendered yet 
        start: function(){
            
            // Initialize routing 
            Backbone.history.start({
                pushState: true,
                root: '/' + Backbone.urlRoot + '/'
            });
            
            // Default page
            if( ! Backbone.history.getFragment() ){
                $('#navbar [href=home]').click();
            }

        },
        
        loadTab: function(){
            $('#navbar [href=' + Backbone.history.getFragment() + ']').click();
        },
        
    });
    
});