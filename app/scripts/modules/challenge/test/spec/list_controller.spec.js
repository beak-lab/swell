/*global expect */
/*jshint expr: true */
'use strict';

define([
        'app',
        'challenge_list_controller'
    ],

    function(App) {

        var ListController = App.ChallengeApp.List.Controller;

        describe('Challenge List Controller', function() {

            it('should exist', function() {
                expect(ListController).to.exist;
            });

            it('actions should exist', function() {
                expect(ListController.listChallenge).to.exist;
            });

            // it('should be an instance of Challenge', function() {
            //     expect(challenge).to.be.an.instanceof(App.ChallengeApp.List.Controller);
            // });

        });

    }
);