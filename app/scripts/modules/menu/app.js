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
        // define: function(MenuApp, App, Backbone, Marionette, $, _) { // non inheritable
            // temp stuff for logging
            // TODO: find a better way to get module name
        // }
    });

    // create a new sub module
    App.module('Routers.MenuApp', function(MenuAppRouter, App, Backbone, Marionette) { //, $, _) {
        this.name = 'Routers.MenuApp';

        MenuAppRouter.Router = Marionette.AppRouter.extend({
            initialize: function() {
                // App.log('Before Router', MenuAppRouter.name);
                // start ourselves
                // App.switchApp('MenuApp', {});
            },
            appRoutes: {
                '': 'listMenu',
                'menu': 'listMenu',
                // 'menu/create': 'createMenu',
                // 'menu/:slug' : 'showMenu'
            }
        });

        var executeAction = function(action, arg) {
            App.switchApp('MenuApp');
            action(arg);
            // App.execute('set:active:page', 'menu');
        };

        var API = {
            listMenu : function() {
                require(['menu_list_controller'], function(ListController) {
                    App.log('List menu: Controller loaded, requesting menu..', MenuAppRouter.name, 2);
                    executeAction(ListController.listMenu);
                });
            },
        };

        // also watch for manual events:
        App.on('menu:list', function() {
            App.navigate('/menu');
            API.listMenu();
        });

        App.addInitializer(function() {
            App.log('Initalizer running: Starting Router', MenuAppRouter.name, 2);
            new MenuAppRouter.Router({
                controller: API
            });
        });
    });

    return App.MenuAppRouter;
});