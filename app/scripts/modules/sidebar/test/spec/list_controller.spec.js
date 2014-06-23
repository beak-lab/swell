/*global expect */
/*jshint expr: true */
'use strict';

define([
        'app',
        'menu_list_controller'
    ],

    function(App) {

        var ListController = App.MenuApp.List.Controller;

        describe('Menu List Controller', function() {

            it('should exist', function() {
                expect(ListController).to.exist;
            });

            it('actions should exist', function() {
                expect(ListController.listMenu).to.exist;
            });

            // it('should be an instance of Menu', function() {
            //     expect(menu).to.be.an.instanceof(App.MenuApp.List.Controller);
            // });

        });

    }
);