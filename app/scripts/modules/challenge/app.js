'use strict';
define(function(require) {
    var App = require('app');
    // var $ = require('jquery');

    App.module('Challenge', {
        startWithParent: false,
    });

    App.Challenge.on('start', function() {

        $('body').addClass('is-challenge-module');

    })

    App.Challenge.on('stop', function() {
        $('body').removeClass('is-challenge-module');
    })

    App.module('Routers.Challenge', function(ChallengeRouter, App, Backbone, Marionette) { //, $, _) {
        this.name = 'Routers.Challenge';

        ChallengeRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'challenges'               : 'list',     // list all
                'domain/:domain/challenges': 'list',     // list all by domain
                'challenge/:slug'          : 'show',     // show one
            }
        });

        var executeAction = function(action, arg) {
            App.switchApp('Challenge');
            action(arg);
            App.execute('set:active:page', 'challenges');
        };

        var API = {
            list: function(domain) {
                require(['challenge_list_controller'], function(Controller) {
                    App.log('Challenge: Controller loaded, requesting challenge..', ChallengeRouter.name, 2);
                    executeAction(Controller.list, domain);
                });
            },
            // byDomain: function(domain) {
            //     require(['challenge_list_controller'], function(Controller) {
            //         App.log('Challenge: Controller loaded, requesting challenge..', ChallengeRouter.name, 2);
            //         executeAction(Controller.byDomain, domain);
            //     });
            // },
            show: function(slug) {
                require(['challenge_show_controller'], function(Controller) {
                    executeAction(Controller.show, slug);
                });
            },
        };



        // also watch for manual events:
        App.on('challenge:list', function(domain) {
            if (domain) {
                App.navigate('/domain/' + domain + '/challenges');
            } else {
                App.navigate('/challenges');
            }
            API.list(domain);
        });

        // App.on('challenge:bydomain', function(domain) {
        //     App.navigate('/domain/' + domain + '/challenges');
        //     API.byDomain(domain);
        // });

        App.on('challenge:show', function(slug) {
            App.navigate('/challenge/' + slug);
            API.show(slug);
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