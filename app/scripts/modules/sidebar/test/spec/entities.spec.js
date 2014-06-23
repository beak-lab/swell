/*global expect */
/*jshint expr: true */
'use strict';

define([
        'app',
        'menu_entity'
    ],

    function(App) {
        var contextName = 'EntitiesMenuTest';
        var moduleMenu = App.request('menu:entities');

        App.log('Menu collection', contextName, 1);

        describe('Menu collection', function() {

            it('should exist', function() {
                expect(moduleMenu).to.exist;
            });

            // it('should be an instance of XXXXX', function() {
            //     // expect(XXXXX).to.be.an.instanceof(XXXXX);
            // });

        });

    }
);