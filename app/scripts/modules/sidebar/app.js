'use strict';
define(function(require) {
    var App = require('app');
    var Controller = require('sidebar_controller');

    App.module('Sidebar', {
        define: function() {
            Controller.setup();
        }
    });

});