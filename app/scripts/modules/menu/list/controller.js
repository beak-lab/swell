'use strict';
define(['app', 'menu_list_view'], function(App, View) {
    App.module('MenuApp.List', function (List, App, Backbone, Marionette, $) { // , _
        var contextName = 'MenuApp.List.Controller';
        List.Controller = {
            listMenu: function() {
                
            }
        };
    });
    return App.MenuApp.List.Controller;
});