/*global expect */
/*jshint expr: true */
'use strict';

define([
        'app',
        'challenge_entity'
    ],

    function(App) {
        var contextName = 'EntitiesChallengeTest';
        var moduleChallenge = App.request('challenge:entities');

        App.log('Challenge collection', contextName, 1);

        describe('Challenge collection', function() {

            it('should exist', function() {
                expect(moduleChallenge).to.exist;
            });

            // it('should be an instance of XXXXX', function() {
            //     // expect(XXXXX).to.be.an.instanceof(XXXXX);
            // });

        });

    }
);