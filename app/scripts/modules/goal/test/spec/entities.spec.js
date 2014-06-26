/*global expect */
/*jshint expr: true */
'use strict';

define([
        'app',
        'goal_entity'
    ],

    function(App) {
        var contextName = 'EntitiesGoalTest';
        var moduleGoal = App.request('goal:entities');

        App.log('Goal collection', contextName, 1);

        describe('Goal collection', function() {

            it('should exist', function() {
                expect(moduleGoal).to.exist;
            });

            // it('should be an instance of XXXXX', function() {
            //     // expect(XXXXX).to.be.an.instanceof(XXXXX);
            // });

        });

    }
);