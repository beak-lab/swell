/*global expect */
/*jshint expr: true */
'use strict';

define([
        'app',
        'activity_list_controller'
    ],

    function(App) {

        var ListController = App.ActivityApp.List.Controller;

        describe('Activity List Controller', function() {

            it('should exist', function() {
                expect(ListController).to.exist;
            });

            it('actions should exist', function() {
                expect(ListController.listActivity).to.exist;
            });

            // it('should be an instance of Activity', function() {
            //     expect(activity).to.be.an.instanceof(App.ActivityApp.List.Controller);
            // });

        });

    }
);