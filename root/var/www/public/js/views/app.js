define(function(require){
    
    var AppRouter = require('routers/app-router');
    var Backbone = require('app/backbone-base');
    var BaseView = require('views/view-base');
    var CamPanel = require ('views/cam-panel');
    var Config = require('models/config');
    var MainMenu = require ('views/main-menu');
    
    /********************************/
    
    return BaseView.extend({
        
        tagName: 'div',
        id: 'app',
        className: 'container-fluid',
        
        initialize: function(){
            
            // So everyone can get to it
            BaseView.app = this;
            
            // Models
            this.config = new Config();

            // Views
            this.mainMenu = new MainMenu();
            this.camPanel = new CamPanel();
            
            // Router
            this.router = new AppRouter(this);
            
            // Events
            this.listenTo(this.config, 'sync', this.configSync);
            
            // Get config so we can render
            this.config.fetch();
            
        },
        
        events: {
        },
        
        render: function(){
            
            this.$el.append(this.mainMenu.render().el);
            this.$el.append(this.camPanel.render().el);
            
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
        
        // Render the app
        configSync: function(e){
            $('#page-loading').remove();
            $('body').append(this.render().el);
        }
        
    });
    
});
