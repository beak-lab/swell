'use strict';
define(function(require) {
    var App = require('app');

    App.module('User', {
        startWithParent: false,
    });

    // create a new sub module
    App.module('Routers.User', function(UserRouter, App, Backbone, Marionette) { //, $, _) {
        this.name = 'Routers.User';

        UserRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'profile': 'profile',
            }
        });

        var executeAction = function(action, arg) {
            App.switchApp('User');
            action(arg);
            App.execute('set:active:page', 'profile');
        };

        var API = {
            profile : function() {
                require(['user_controller'], function(Controller) {
                    App.log('User: Controller loaded, requesting user..', UserRouter.name, 2);
                    executeAction(Controller.show);
                });
            },
        };

        App.on('user:profile', function() {
            App.navigate('/profile');
            API.profile();
        });

        App.addInitializer(function() {
            App.log('Initalizer running: Starting Router', UserRouter.name, 2);
            new UserRouter.Router({
                controller: API
            });
        });
    });

    return App.UserRouter;
});