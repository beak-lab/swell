/*global expect */
/*jshint expr: true */
'use strict';

define([
        'app',
        'user_entity'
    ],

    function(App) {
        var contextName = 'EntitiesUserTest';
        var moduleUser = App.request('user:entities');

        App.log('User collection', contextName, 1);

        describe('User collection', function() {

            it('should exist', function() {
                expect(moduleUser).to.exist;
            });

            // it('should be an instance of XXXXX', function() {
            //     // expect(XXXXX).to.be.an.instanceof(XXXXX);
            // });

        });

    }
);