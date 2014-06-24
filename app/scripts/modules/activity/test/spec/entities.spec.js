/*global expect */
/*jshint expr: true */
'use strict';

define([
        'app',
        'activity_entity'
    ],

    function(App) {
        var contextName = 'EntitiesActivityTest';
        var moduleActivity = App.request('activity:entities');

        App.log('Activity collection', contextName, 1);

        describe('Activity collection', function() {

            it('should exist', function() {
                expect(moduleActivity).to.exist;
            });

            // it('should be an instance of XXXXX', function() {
            //     // expect(XXXXX).to.be.an.instanceof(XXXXX);
            // });

        });

    }
);