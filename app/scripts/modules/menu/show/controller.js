'use strict';
define(['app', 'menu_view'], function(App, View) {
    App.module('Menu.Show', function (Show, App, Backbone, Marionette) { // , _
        var contextName = 'Menu.Show.Controller';
        Show.Controller = {
            setup: function() {
                var layout = new View.Layout();
            }
        };
    });
    return App.Menu.Show.Controller;
});