'use strict';
define(function(require) {
    var App = require('app');

    // create a new module
    App.module('User', {
        startWithParent: false,
        // only avaiable with object literal def of module;
        initialize: function(options, moduleName, App) { // on prototype chain thus inheritable
            this.name = moduleName;
            App.log('Initalize: ' + App.getCurrentRoute(), this.name, 2);
        },
        // define: function(UserApp, App, Backbone, Marionette, $, _) { // non inheritable
            // temp stuff for logging
            // TODO: find a better way to get module name
        // }
    });

    // create a new sub module
    App.module('Routers.User', function(UserRouter, App, Backbone, Marionette) { //, $, _) {
        this.name = 'Routers.User';

        UserRouter.Router = Marionette.AppRouter.extend({
            initialize: function() {
                // App.log('Before Router', UserAppRouter.name);
                // start ourselves
                // App.switchApp('UserApp', {});
            },
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

        // also watch for manual events:
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