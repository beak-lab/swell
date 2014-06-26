'use strict';
define(['app'], function(App) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var contextName = 'Goal.Entity';
        Entities.Goal = Backbone.Model.extend({

        });

        var initializeFakes = function() {
            App.log('Initializing Fake Activitys', contextName, 1);

            Entities.goals = new Entities.ActivityCollection([
                {
                    id: 1,
                    goal: 'To do a thing'
                }, {
                    id: 2,
                    goal: 'To do another thing'
                }
            ]);

        };

        var API = {
            getGoals: function(array) {
                if (undefined === Entities.fakes) {
                    initializeFakes();
                }

                return Entities.goals.filter(function(model) {
                    return _.contains(array, model.id);
                });
            },
            getGoalEntity: function(id) {
                var model = new Entities.Goal(id);
                App.log('Made new object: ' + id, contextName, 1);
                return model;
            },
        };

        App.reqres.setHandler('goal:entities', function(array) {
            return API.getGoals(array);
        });

    });

    return;
});