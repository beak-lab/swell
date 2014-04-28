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
        // define: function(DomainApp, App, Backbone, Marionette, $, _) { // non inheritable
            // temp stuff for logging
            // TODO: find a better way to get module name
        // }
    });

    // create a new sub module
    App.module('Routers.DomainApp', function(DomainAppRouter, App, Backbone, Marionette) { //, $, _) {
        this.name = 'Routers.DomainApp';

        DomainAppRouter.Router = Marionette.AppRouter.extend({
            initialize: function() {
                // App.log('Before Router', DomainAppRouter.name);
                // start ourselves
                // App.switchApp('DomainApp', {});
            },
            appRoutes: {
                '': 'listDomain',
                'domain': 'listDomain',
                // 'domain/create': 'createDomain',
                // 'domain/:slug' : 'showDomain'
            }
        });

        var executeAction = function(action, arg) {
            App.switchApp('DomainApp');
            action(arg);
            // App.execute('set:active:page', 'domain');
        };

        var API = {
            listDomain : function() {
                require(['domain_list_controller'], function(ListController) {
                    App.log('List domain: Controller loaded, requesting domain..', DomainAppRouter.name, 2);
                    executeAction(ListController.listDomain);
                });
            },
        };

        // also watch for manual events:
        App.on('domain:list', function() {
            App.navigate('/domain');
            API.listDomain();
        });

        App.addInitializer(function() {
            App.log('Initalizer running: Starting Router', DomainAppRouter.name, 2);
            new DomainAppRouter.Router({
                controller: API
            });
        });
    });

    return App.DomainAppRouter;
});