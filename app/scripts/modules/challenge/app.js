'use strict';
define(function(require) {
    var App = require('app');

    App.module('Challenge', {
        startWithParent: false,
    });

    App.module('Routers.Challenge', function(ChallengeRouter, App, Backbone, Marionette) { //, $, _) {
        this.name = 'Routers.Challenge';

        ChallengeRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'challenges'               : 'list',
                'challenge/:slug'          : 'show',
                'domain/:domain/challenges': 'byDomain',
            }
        });

        var executeAction = function(action, arg) {
            App.switchApp('Challenge');
            action(arg);
            App.execute('set:active:page', 'challenges');
        };

        var API = {
            list: function() {
                require(['challenge_list_controller'], function(Controller) {
                    App.log('Challenge: Controller loaded, requesting challenge..', ChallengeRouter.name, 2);
                    executeAction(Controller.list);
                });
            },
            show: function(slug) {
                require(['challenge_list_controller'], function(Controller) {
                    App.log('Challenge: Controller loaded, requesting challenge..', ChallengeRouter.name, 2);
                    executeAction(Controller.show, slug);
                });
            },
            byDomain: function(domain) {
                console.log('byDomain matched');
                require(['challenge_list_controller'], function(Controller) {
                    App.log('Challenge: Controller loaded, requesting challenge..', ChallengeRouter.name, 2);
                    executeAction(Controller.byDomain, domain);
                });
            },
        };

        // also watch for manual events:
        App.on('challenge:list', function() {
            App.navigate('/challenges');
            API.list();
        });

        App.on('challenge:show', function(slug) {
            App.navigate('/challenge/' + slug);
            API.show(slug);
        });

        App.on('challenge:bydomain', function(domain) {
            App.navigate('/domain/' + domain + '/challenges');
            API.byDomain(domain);
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