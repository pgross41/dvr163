define(function(require){
    
    var Backbone = require('app/backbone-base');
    var BaseView = require('views/view-base');
    var Mustache = require('mustache');
    var SingleCamView = require ('views/cam-view');
    var template = require ('text!html/cam-panel.tpl');
    
    /********************************/
    
    return BaseView.extend({
        
        tagName: 'div',
        id: 'cam-panel',
        className: 'row',
        
        initialize: function(channel_number){
            
            this.app = BaseView.app;
            
            // Events
            // this.listenTo(this.$('img'), 'load', this.imgLoad);
            
        },
        
        events: {
        },
        
        render: function(){
            
            this.$el.html(Mustache.render(template, {}));

            for (var i = 0; i < this.app.config.get('cam_count'); i++) {
                this.$('#cam-views').append((new SingleCamView(i)).render().el);
            }
            
            return this;
            
        },
        
        /********************************/
        
    });
    
});
