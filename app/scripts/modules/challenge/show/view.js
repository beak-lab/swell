'use strict';
define(['app', 'templates', 'dust'], function(App) {
    App.module('Challenge.Show.View', function(View, App, Backbone, Marionette) { // , $, _
        View.Layout = Marionette.Layout.extend({
            template: 'challenge_show_layout',

            regions: {
                menuRegion: '#show_menu',
                pageRegion: '#show_page'
            },

            flash: function(cssClass) { // fade in and out.
                var $view = this.$el;
                $view.hide().toggleClass(cssClass).fadeIn(800, function() {
                    setTimeout(function() {
                        $view.toggleClass(cssClass);
                    }, 500);
                });
            }
        });

        View.ChallengeMenu = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'challenge_menu',

            events: {
                'click #challenge_menu li': 'clicked'
            },

            clicked: function(e) {
                e.preventDefault();
                this.trigger('menu:clicked', e.target.id);
            }
        });

        View.Challenge = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'challenge',

            events: {
            },
            onRender: function() {
                // this.$el.trigger('refresh');
                // this.$el.find(".ui-listview").trigger('create');
                // this.$el.find("#category-list").listview('refresh');
            }

        });


    });

    return App.Challenge.Show.View;
});