/*global expect */
/*jshint expr: true */
'use strict';

define([
        'app',
        'jquery',
        'menu_list_view',
        'menu_entity'
    ],

    function(App, $) {
        var contextName = 'MenuApp.List.View';

        before(function () {
            // Create test fixture.
            this.$fixture = $('<div id=\'menu-view-fixture\'></div>');
        });

        beforeEach(function () {
            // Empty out and rebind the fixture for each run.
            this.$fixture.empty().appendTo($('#fixtures'));

            // New default model and view for each test.
            var entities = App.request('menu:entities');
            if (entities !== null) {
                App.log('Creating view: ', contextName, 1);
                this.view = new App.MenuApp.List.View.Menu({
                    el: this.$fixture,
                    collection: entities
                });
                this.view.render();
            }
        });

        afterEach(function () {
            // Destroying the model also destroys the view.
            // App.log('Teardown: ' + this.view.collection.length, contextName, 1);
            // this.view.collection.reset();
        });

        after(function () {
            // Remove all sub-fixtures after test suite finishes.
            App.log('Teardown: ' + this.view.collection.length, contextName, 1);
            this.view.collection.reset();
            $('#fixtures').empty();
        });

        describe('List view', function() {

            it('can render menuList', function () {
                App.log('this.$fixture.html(): ' + this.$fixture.html(), contextName, 1);
                expect(this.$fixture.html()).to.contain('menu_list');
            });

        });

//        describe('List view Deferred', function() {
//            var entities = App.request('menu:entities');
//            console.log('entities: ' + JSON.stringify(entities));
//            $.when(entities).done(function(items){
//                console.log('items: ' + JSON.stringify(items));
//                if (items !== null) {
//                    var SOMEMODULE = new App.MenuApp.List.Menu({
//                        collection: entities
//                    });
//                }
//
//                it('should exist', function() {
//                    expect(SOMEMODULE).to.exist;
//                });
//
//            });
//
//            // it('should be an instance of XXXXX', function() {
//            //     // expect(XXXXX).to.be.an.instanceof(XXXXX);
//            // });
//
//        });

    }
);