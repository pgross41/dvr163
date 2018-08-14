define(function(require){
    
    var AppRouter = require('routers/app-router');
    var Backbone = require('app/backbone-base');
    var BaseView = require('views/view-base');
    var GwDevinfo = require('models/gw-devinfo');
    
    /********************************/
    
    return BaseView.extend({
        
        tagName: 'div',
        id: 'app',
        className: 'container-fluid',
        
        initialize: function(){
            
            // So everyone can get to it
            BaseView.app = this;
            
            // Models
            this.devinfo = new GwDevinfo();
            this.devinfo.fetch();
            
            // Views
            // this.timelinePanel = new TimelinePanelView();
            // this.timelineTools = new TimelineToolsView();
            
            // Router
            this.router = new AppRouter(this);
            
        },
        
        events: {
        },
        
        render: function(){
            
            this.$el.append('heyyyyyyyy from app.js');
            // this.$el.append(this.timelinePanel.render().el);
            // this.$el.append(this.timelineTools.render().el);
            
            return this;
            
        },
        
        /********************************/
        
        route: function(){
            
            // Initialize Backbone router
            Backbone.history.start({
                pushState: true,
                // root: '/' + this.router.URL_ROOT + '/'
            });
            
            // Default page
            if( ! Backbone.history.getFragment() ){
                console.log('go to default page');
                // this.router.navigate(this.router.DEFAULT_ROUTE_FRAGMENT, {
                //     ticket_number: this.router.NO_TICKET_PLACEHOLDER,
                //     replace: true
                // });
            }
        },
        
    });
    
});
