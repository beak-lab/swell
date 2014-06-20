'use strict';
define(function(require) {
    var App = require('app');
    var Controller = require('menu_controller');

    // create a new module
    App.module('Menu', {
        // only avaiable with object literal def of module;
        // initialize: function(options, moduleName, App) { // on prototype chain thus inheritable
            // this.name = moduleName;
            // App.log('Initalizing menu' , this.name, 2);
        // },
        define: function() {//Menu, App, Backbone, Marionette, $, _) { // non inheritable
            // temp stuff for logging
            // TODO: find a better way to get module name
            Controller.setup();
        }
    });


    App.commands.setHandler('set:active:page', function(name) {
        Controller.setActivePage(name);
    });

    // create a new sub module
    // App.module('Routers.Menu', function(MenuRouter, App, Backbone, Marionette) { //, $, _) {
        // this.name = 'Routers.Menu';

        // MenuRouter.Router = Marionette.AppRouter.extend({
            // initialize: function() {
                // App.log('Before Router', MenuRouter.name);
                // start ourselves
                // App.switchApp('Menu', {});
            // },
            // appRoutes: {
                // '': 'listMenu',
                // 'menu': 'listMenu',
                // 'menu/create': 'createMenu',
                // 'menu/:slug' : 'showMenu'
            // }
        // });


        // var executeAction = function(action, arg) {
            // App.switchApp('Menu');
            // action(arg);
            // App.execute('set:active:page', 'menu');
        // };

        // var API = {
        //     listMenu : function() {
        //         require(['menu_list_controller'], function(ListController) {
        //             App.log('List menu: Controller loaded, requesting menu..', MenuRouter.name, 2);
        //             executeAction(ListController.listMenu);
        //         });
        //     },
        // };

        // also watch for manual events:
        // App.on('menu:list', function() {
        //     App.navigate('/menu');
        //     API.listMenu();
        // });

        // App.addInitializer(function() {
        //     App.log('Initalizer running: Starting Router', MenuRouter.name, 2);
        //     new MenuRouter.Router({
        //         controller: API
        //     });
        // });
    // });

    // return App.MenuRouter;
});