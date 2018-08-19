define(function(require){
    
    var Backbone = require('app/backbone-base');
    var BaseView = require('views/view-base');
    var template = require ('text!html/cam-view.tpl');
    var Mustache = require('Mustache');
    
    /********************************/
    
    return BaseView.extend({
        
        tagName: 'div',
        className: 'cam-view',
        
        initialize: function(channel_number){
            
            this.app = BaseView.app;
            this.data = {
                channel_number: channel_number,
                name: this.app.config.get('cam_names')[channel_number]
            }
            
        },
        
        events: {
            'load img': 'imgLoad',
            'click img': 'play',
            'click .cam-pause': 'pause',
            'click .cam-save': 'save',
            'click .cam-fullscreen': 'fullscreen',
        },
        
        render: function(){
            
            var self = this; 
            
            this.$el.html(Mustache.render(template, this.data));
            this.$camImg = this.$('img');
            
            this.$camImg.bind('load', function(e) {
                self.$('.cam-loading-icon').hide();
                self.$camImg.css('visibility', 'visible');
            });
            
            this.$camImg.bind('error', function(e) {
                self.$('.cam-loading-icon').hide();
                self.$camImg.css('visibility', 'visible');
                console.log('error!');
            });
            
            return this;
            
        },
        
        /********************************/
        
        imgLoad: function(e){
            console.log('load', e);
        },
        
        play: function(){
            var streamUrl = '/api/stream/mjpeg/' + this.data.channel_number + '?nocache=' + Math.random();
            if(this.$camImg.attr('src') != streamUrl){
                this.$camImg.css('visibility', 'hidden');
                this.$('.cam-loading-icon').show();
                this.$camImg.attr('src', streamUrl);
            }
        },
        
        pause: function(){
            this.$camImg.attr('src', 'images/camera-play.png');
        },
        
        save: function(){
            
            // Convert to base64
            var c = document.createElement('canvas');
            var img = this.$camImg[0];
            c.width = img.width;
            c.height = img.height;
            var ctx = c.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            // Create/click link to download 
            var time = (new Date()).toISOString().substr(0, 19).replace(/:|T|-/g, '');
            var a = $("<a>")
            .attr("href", c.toDataURL('image/png'))
            .attr("download", this.data.name + ' ' + time + '.png')
            .appendTo("body");
            a[0].click();
            a.remove();
        },

        fullscreen: function(){
            if (screenfull.enabled) {
                screenfull.request(this.$('img')[0]);
            }
        }
        
    });
    
});
