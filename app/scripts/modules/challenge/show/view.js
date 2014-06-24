'use strict';
define(['app', 'templates', 'dust', 'jquery-ui/sortable', 'jquery-ui/droppable', 'backbone.syphon'], function(App) {
    App.module('Challenge.Show.View', function(View, App, Backbone, Marionette) { // , $, _
        View.Layout = Marionette.Layout.extend({
            template: 'challenge_show_layout',

            regions: {
                menuRegion: '#show_menu',
                // pageRegion: '#show_page'
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