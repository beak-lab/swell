'use strict';
define(['app', 'templates', 'dust', 'backbone.syphon', 'dustIterate', 'bootstrap.popover', 'swipejs'], function(App) {
    App.module('Challenge.Show.View', function(View, App, Backbone, Marionette, $) {
        View.Layout = Marionette.Layout.extend({
            template: 'challenge_show_layout',

            regions: {
                menuRegion: '#show_menu',
                // pageRegion: '#show_page'
            },

            events: {
                'click #challenge-description-expander': 'expanderclicked'
            },

            expanderclicked: function(e) {
                e.preventDefault();
                $('#challenge-description-expander, #challenge-description').toggleClass('is-expanded');
            },

            flash: function(cssClass) { // fade in and out.
                var $view = this.$el;
                $view.hide().toggleClass(cssClass).fadeIn(800, function() {
                    setTimeout(function() {
                        $view.toggleClass(cssClass);
                    }, 500);
                });
            },

        });

        View.ChallengeMenu = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'challenge_menu',

            events: {
                'click #challenge_menu span': 'clicked'
            },

            clicked: function(e) {
                e.preventDefault();
                $(this.el).find('.challenge__menu__item').removeClass('is-active');
                $(e.target).addClass('is-active');
                this.trigger('menu:clicked', e.target.id);

                // also hide the description
                // $('#challenge-description').hide();
                // $('#challenge-description-expander').hide();
                // actually, lets do it with css
                $('.challenge').addClass('is-compacted');


            }
        });

        View.Resources = Marionette.ItemView.extend({
            template: 'resources',
            events: {
                'click .resource__article__content-expander' : 'resourceExpanderClicked',
                'click .resource__video__video' : 'videoClicked'
            },

            onRender : function(){
                // if (window.plugins) {
                //     window.plugins.html5Video.initialize({
                //         "id-2": "howtoaceajobinterview.mp4",
                //     });

                //     window.plugins.html5Video.play("id-2");
                // }
            },
            videoClicked : function(){
                /*
                if (window.plugins) {
                    e.preventDefault();
                    VideoPlayer.play('file:///android_asset/www/' + $(e.target).attr('src'));
                }*/
            },

            resourceExpanderClicked : function(e){
                $(e.target).closest('.resource__article').toggleClass('is-expanded');
            },

            serializeData: function() {
                var data = {};
                data.resources = this.options.resources;
                return data;
            },

        });

        View.Stuff = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'stuff',


            serializeData: function() {
                return {
                    goals: this.options.goals,
                    activities: this.options.activities
                };
            },

            onRender: function() {
                
                var rater = this.$el.find('#rater'),
                    self = this;



                rater.on('change', function() {
                    console.log();
                    var status = 'test';
                    switch (rater.val()) {
                        case '1': status = 'Ok ish'; break;
                        case '2': status = 'A bit nice'; break;
                        case '3': status = 'Average'; break;
                        case '4': status = 'Super good'; break;
                        case '5': status = 'Awesome'; break;
                    }
                    self.$el.find('#raterOutput').val(status);
                });

                this.$el.find('.mystuff__share-buddy').popover({
                    trigger: 'focus',
                    html: true,
                });
            },

            onShow: function(){
                var historySwipe = new Swipe(this.$el.find('#mystuff-history')[0]);
                
            },


        });
    });

    return App.Challenge.Show.View;
});