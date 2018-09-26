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
            
            var self = this; 
            
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
            
            // Auto-zoom for phone screens
            window.addEventListener("orientationchange", function() {
                setTimeout( function(){
                    self.mainMenu.setZoom(1);
                    self.autoZoom();
                }, 1000);
            }, false);
            
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
            this.apiBase = this.config.get('root') + '/api';
            $('#page-loading').remove();
            $('body').append(this.render().el);
            this.autoZoom();
        },
        
        autoZoom: function(){
            
            var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var camViewWidth = this.$('.cam-view').first().outerWidth();
            if(camViewWidth > windowWidth){
                this.mainMenu.zoomOut();
                this.autoZoom();
            }
            
        }
        
    });
    
});
