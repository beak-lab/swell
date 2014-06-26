'use strict';
define(['app', 'goal_create_view'], function(App, View) {
    App.module('Goal.Create', function (Create, App, Backbone, Marionette, $) { // , _
        var contextName = 'Goal.Create.Controller';
        Create.Controller = {
            create: function() {
                return new View.GoalAdd({
                    autoGoals: [
                        { name: 'Fix a car' },
                        { name: 'Blow glass' }
                    ]
                });
            }
        };
    });

    App.reqres.setHandler('goal:create', function() {
        return App.Goal.Create.Controller.create();
    });

    return App.Goal.Create.Controller;
});