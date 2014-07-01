'use strict';
/*global window*/
define(['app', 'goal_create_view', 'activity_entity'], function(App, View) {
    App.module('Goal.Create', function (Create, App, Backbone, Marionette, $, _) {
        Create.Controller = {
            create: function() {
                var goals = [];
                var key = 'checkboxable-optionset';
                var data = JSON.parse(window.localStorage.getItem('challenge[2]'));
                var activityId = 5;

                $.when(App.request('activity:entity', activityId)).done(function(activity) {
                    var activityData = activity.get('data');
                    for (var i = 0; i < _.size(data[activityId][key]); i++) {
                        if (data[activityId][key][i]) {
                            goals.push({name: activityData[i].goalText});
                        }
                    }
                });

                var view = new View.GoalAdd({
                    autoGoals: goals
                });

                // TODO: get this dynamically
                var challenge = 1;

                // when the 'next' button is pressed
                view.on('goals:save', function(data) {
                    // save the goals for this challange
                    window.localStorage.setItem('goals[' + challenge + ']', JSON.stringify(data));
                });

                return view;
            }
        };
    });

    App.reqres.setHandler('goal:create', function() {
        return App.Goal.Create.Controller.create();
    });

    return App.Goal.Create.Controller;
});