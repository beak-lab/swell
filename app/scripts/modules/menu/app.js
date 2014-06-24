'use strict';
define(function(require) {
    var App = require('app');
    var Controller = require('menu_controller');

    App.module('Menu', {
        define: function() {//Menu, App, Backbone, Marionette, $, _) { // non inheritable
            Controller.setup();
        }
    });

    App.commands.setHandler('set:active:page', function(name) {
        Controller.setActivePage(name);
    });

    App.commands.setHandler('set:back', function(page) {
        Controller.setBackButtonLink(page);
    });
});