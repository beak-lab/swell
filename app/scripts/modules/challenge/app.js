'use strict';
define(function(require) {
    var App = require('app');

    // create a new module
    App.module('Challenge', {
        startWithParent: false,
        // only avaiable with object literal def of module;
        initialize: function(options, moduleName, App) { // on prototype chain thus inheritable
            this.name = moduleName;
            App.log('Initalize: ' + App.getCurrentRoute(), this.name, 2);
        },
        // define: function(Challenge, App, Backbone, Marionette, $, _) { // non inheritable
            // temp stuff for logging
            // TODO: find a better way to get module name
        // }
    });

    // create a new sub module
    App.module('Routers.Challenge', function(ChallengeRouter, App, Backbone, Marionette) { //, $, _) {
        this.name = 'Routers.Challenge';

        ChallengeRouter.Router = Marionette.AppRouter.extend({
            initialize: function() {
                // App.log('Before Router', ChallengeRouter.name);
                // start ourselves
                // App.switchApp('Challenge', {});
            },
            appRoutes: {
                'challenges': 'listChallenge',
                // 'challenge/:slug' : 'showChallenge'
            }
        });

        var executeAction = function(action, arg) {
            App.switchApp('Challenge');
            action(arg);
            App.execute('set:active:page', 'challenge');
        };

        var API = {
            listChallenge : function() {
                require(['challenge_list_controller'], function(ListController) {
                    App.log('List challenge: Controller loaded, requesting challenge..', ChallengeRouter.name, 2);
                    executeAction(ListController.listChallenge);
                });
            },
        };

        // also watch for manual events:
        App.on('challenge:list', function() {
            App.navigate('/challenges');
            API.listChallenge();
        });

        App.addInitializer(function() {
            App.log('Initalizer running: Starting Router', ChallengeRouter.name, 2);
            new ChallengeRouter.Router({
                controller: API
            });
        });
    });

    return App.ChallengeRouter;
});