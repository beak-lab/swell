'use strict';
define(function(require) {
    var App = require('app');

    App.module('Activity', {
        startWithParent: false,
    });

    App.module('Routers.Activity', function(ActivityRouter, App, Backbone, Marionette) { //, $, _) {

        ActivityRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'activity/:id': 'show',
            }
        });

        var executeAction = function(action, arg) {
            App.switchApp('ActivityApp');
            action(arg);
        };

        var API = {
            show : function(id) {
                require(['activity_show_controller'], function(Controller) {
                    executeAction(Controller.show, id);
                });
            },
        };

        App.on('activity:show', function(id) {
            App.navigate('/activity/' + id);
            API.show(id);
        });

        App.addInitializer(function() {
            new ActivityRouter.Router({
                controller: API
            });
        });
    });

    return App.ActivityRouter;
});