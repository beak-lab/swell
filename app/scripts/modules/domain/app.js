'use strict';
define(function(require) {
    var App = require('app');

    // create a new module
    App.module('Domain', {
        startWithParent: false,
        // only avaiable with object literal def of module;
        initialize: function(options, moduleName, App) { // on prototype chain thus inheritable
            this.name = moduleName;
            App.log('Initalize: ' + App.getCurrentRoute(), this.name, 2);
        },
        // define: function(Domain, App, Backbone, Marionette, $, _) { // non inheritable
            // temp stuff for logging
            // TODO: find a better way to get module name
        // }
    });

    App.Domain.on('start', function() {
        $('body').addClass('is-domain-module');

    })

    App.Domain.on('stop', function() {
        $('body').removeClass('is-domain-module');
    })

    // create a new sub module
    App.module('Routers.Domain', function(DomainRouter, App, Backbone, Marionette) { //, $, _) {
        this.name = 'Routers.Domain';

        DomainRouter.Router = Marionette.AppRouter.extend({
            initialize: function() {
                // App.log('Before Router', DomainRouter.name);
                // start ourselves
                // App.switchApp('Domain', {});
            },
            appRoutes: {
                '': 'listDomain',
                'domains': 'listDomain',
                // 'domain/create': 'createDomain',
                // 'domain/:slug' : 'showDomain'
            }
        });

        var executeAction = function(action, arg) {
            App.switchApp('Domain');
            action(arg);
            App.execute('set:active:page', 'domains');
        };

        var API = {
            listDomain : function() {
                require(['domain_list_controller'], function(ListController) {
                    App.log('List domain: Controller loaded, requesting domain..', DomainRouter.name, 2);
                    executeAction(ListController.listDomain);
                });
            },
        };

        // also watch for manual events:
        App.on('domain:list', function() {
            App.navigate('/domains');
            API.listDomain();
        });

        App.addInitializer(function() {
            App.log('Initalizer running: Starting Router', DomainRouter.name, 2);
            new DomainRouter.Router({
                controller: API
            });
        });
    });

    return App.DomainRouter;
});