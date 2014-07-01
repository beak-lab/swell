'use strict';
define(function(require) {
    var App = require('app');

    App.module('Goal', {
        startWithParent: false,
        define: function(Goal, App) { // , Backbone, Marionette, $, _
            App.log('Initalize: ' + App.getCurrentRoute(), this.name, 2);
        }
    });

    App.module('Routers.Goal', function(GoalRouter, App, Backbone, Marionette) { //, $, _) {
        this.name = 'Routers.Goal';

        GoalRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'goal': 'createGoals',
            }
        });

        var executeAction = function(action, arg) {
            App.switchApp('Goal');
            action(arg);
        };

        var API = {
            createGoals : function(challengeId) {
                require(['goal_create_controller'], function(Controller) {
                    executeAction(Controller.create, challengeId);
                });
            },
        };

        App.on('goal:create', function(challengeId) {
            // App.navigate('/goal');
            API.createGoals(challengeId);
        });

        App.addInitializer(function() {
            App.log('Initalizer running: Starting Router', GoalRouter.name, 2);
            new GoalRouter.Router({
                controller: API
            });
        });
    });

    return App.GoalRouter;
});