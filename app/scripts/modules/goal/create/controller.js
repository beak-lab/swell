'use strict';
/*global window*/
define(['app', 'goal_create_view', 'activity_entity'], function(App, View) {
    App.module('Goal.Create', function (Create, App, Backbone, Marionette, $, _) {
        Create.Controller = {
            create: function() {
                var goals = [];
                var key = 'checkboxable-optionset';
                var data = JSON.parse(window.localStorage.getItem('activity5'));

                $.when(App.request('activity:entity', 5)).done(function(activity) {
                    var activityData = activity.get('data');
                    for (var i = 0; i < _.size(data[key]); i++) {
                        if (data[key][i]) {
                            goals.push({name: activityData[i].goalText});
                        }
                    }
                });

                return new View.GoalAdd({
                    autoGoals: goals
                });
            }
        };
    });

    App.reqres.setHandler('goal:create', function() {
        return App.Goal.Create.Controller.create();
    });

    return App.Goal.Create.Controller;
});