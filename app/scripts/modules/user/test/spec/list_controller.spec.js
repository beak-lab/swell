/*global expect */
/*jshint expr: true */
'use strict';

define([
        'app',
        'user_list_controller'
    ],

    function(App) {

        var ListController = App.UserApp.List.Controller;

        describe('User List Controller', function() {

            it('should exist', function() {
                expect(ListController).to.exist;
            });

            it('actions should exist', function() {
                expect(ListController.listUser).to.exist;
            });

            // it('should be an instance of User', function() {
            //     expect(user).to.be.an.instanceof(App.UserApp.List.Controller);
            // });

        });

    }
);