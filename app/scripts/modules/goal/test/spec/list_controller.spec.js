/*global expect */
/*jshint expr: true */
'use strict';

define([
        'app',
        'goal_list_controller'
    ],

    function(App) {

        var ListController = App.GoalApp.List.Controller;

        describe('Goal List Controller', function() {

            it('should exist', function() {
                expect(ListController).to.exist;
            });

            it('actions should exist', function() {
                expect(ListController.listGoal).to.exist;
            });

            // it('should be an instance of Goal', function() {
            //     expect(goal).to.be.an.instanceof(App.GoalApp.List.Controller);
            // });

        });

    }
);