'use strict';
define(['app', 'templates', 'dust', 'backbone.syphon'], function(App) {
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

            serializeData: function() {
                var data = {};
                data.resources = this.options.resources;
                return data;
            },
        });

        View.Stuff = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'stuff',

            events: {
            },

        });
    });

    return App.Challenge.Show.View;
});