'use strict';
define(function(require) {
    var App = require('app');

    // create a new module
    App.module('App', {
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
    App.module('Routers.UserApp', function(UserAppRouter, App, Backbone, Marionette) { //, $, _) {
        this.name = 'Routers.UserApp';

        UserAppRouter.Router = Marionette.AppRouter.extend({
            initialize: function() {
                // App.log('Before Router', UserAppRouter.name);
                // start ourselves
                // App.switchApp('UserApp', {});
            },
            appRoutes: {
                '': 'listUser',
                'user': 'listUser',
                // 'user/create': 'createUser',
                // 'user/:slug' : 'showUser'
            }
        });

        var executeAction = function(action, arg) {
            App.switchApp('UserApp');
            action(arg);
            // App.execute('set:active:page', 'user');
        };

        var API = {
            listUser : function() {
                require(['user_list_controller'], function(ListController) {
                    App.log('List user: Controller loaded, requesting user..', UserAppRouter.name, 2);
                    executeAction(ListController.listUser);
                });
            },
        };

        // also watch for manual events:
        App.on('user:list', function() {
            App.navigate('/user');
            API.listUser();
        });

        App.addInitializer(function() {
            App.log('Initalizer running: Starting Router', UserAppRouter.name, 2);
            new UserAppRouter.Router({
                controller: API
            });
        });
    });

    return App.UserAppRouter;
});