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
        // define: function(ChallengeApp, App, Backbone, Marionette, $, _) { // non inheritable
            // temp stuff for logging
            // TODO: find a better way to get module name
        // }
    });

    // create a new sub module
    App.module('Routers.ChallengeApp', function(ChallengeAppRouter, App, Backbone, Marionette) { //, $, _) {
        this.name = 'Routers.ChallengeApp';

        ChallengeAppRouter.Router = Marionette.AppRouter.extend({
            initialize: function() {
                // App.log('Before Router', ChallengeAppRouter.name);
                // start ourselves
                // App.switchApp('ChallengeApp', {});
            },
            appRoutes: {
                '': 'listChallenge',
                'challenge': 'listChallenge',
                // 'challenge/create': 'createChallenge',
                // 'challenge/:slug' : 'showChallenge'
            }
        });

        var executeAction = function(action, arg) {
            App.switchApp('ChallengeApp');
            action(arg);
            // App.execute('set:active:page', 'challenge');
        };

        var API = {
            listChallenge : function() {
                require(['challenge_list_controller'], function(ListController) {
                    App.log('List challenge: Controller loaded, requesting challenge..', ChallengeAppRouter.name, 2);
                    executeAction(ListController.listChallenge);
                });
            },
        };

        // also watch for manual events:
        App.on('challenge:list', function() {
            App.navigate('/challenge');
            API.listChallenge();
        });

        App.addInitializer(function() {
            App.log('Initalizer running: Starting Router', ChallengeAppRouter.name, 2);
            new ChallengeAppRouter.Router({
                controller: API
            });
        });
    });

    return App.ChallengeAppRouter;
});