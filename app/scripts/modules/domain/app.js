'use strict';
define(function(require) {
    var App = require('app');
    var $ = require('jquery');

    App.module('Domain', {
        startWithParent: false,
        initialize: function(options, moduleName, App) { // on prototype chain thus inheritable
            this.name = moduleName;
            App.log('Initalize: ' + App.getCurrentRoute(), this.name, 2);
        },
    });

    App.Domain.on('start', function() {
    });

    App.Domain.on('stop', function() {
        $('body').removeClass('is-domain-list-view');
    });

    App.module('Routers.Domain', function(DomainRouter, App, Backbone, Marionette) { //, $, _) {
        this.name = 'Routers.Domain';

        DomainRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'domains': 'listDomain',
                'domain/:slug/goals' : 'showDomainGoals'
            }
        });

        var executeAction = function(action, arg) {
            App.switchApp('Domain');
            action(arg);
            App.execute('set:active:page', 'domains');
        };

        var API = {
            listDomain: function() {
                require(['domain_list_controller'], function(Controller) {
                    executeAction(Controller.listDomain);
                });
            },
            showDomainGoals: function(model) {
                require(['domain_goal_controller'], function(Controller) {
                    executeAction(Controller.show, model);
                });
            },
        };

        App.on('domain:list', function() {
            App.navigate('/domains');
            API.listDomain();
        });

        App.on('domain:goals', function(model) {
            App.navigate('/domain/' + model.get('slug') + '/goals');
            API.showDomainGoals(model);
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