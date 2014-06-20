'use strict';
define(['app', 'templates', 'dust'], function(App) {
    App.module('User.Profile.View', function(View, App, Backbone, Marionette) { // , $, _
        var contextName = 'User.Profile.View';

        View.Layout = Marionette.Layout.extend({
            template: 'user_layout',

            regions: {
                panelRegion: '#panel-region',
                userRegion: '.content'
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

        View.User = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'profile',

            events: {
                'click': 'highlightName',
            },

        });

    });

    return App.User.Profile.View;
});