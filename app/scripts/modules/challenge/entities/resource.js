'use strict';
define(['app'], function(App) { // resource_entity
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {

        var initializeFakes = function() {

            Entities.fakes = new Entities.ActivityCollection([{
                id: 1,
                title: 'A nice title',
                data: 'This is a resource'
            }, {
                id: 2,
                title: 'A nice title 1',
                data: 'This is a resource 1'
            }, {
                id: 3,
                title: 'A nice title 2',
                data: 'This is a resource 2'
            }]);
        };

        var API = {
            getEntity: function(id) {
                if (undefined === Entities.fakes) {
                    initializeFakes();
                }

                var model = Entities.fakes.findWhere({
                    id: parseInt(id)
                });

                return model;
            },
            getEntities: function(array) {
                if (undefined === Entities.fakes) {
                    initializeFakes();
                }

                return Entities.fakes.filter(function(model) {
                    return _.contains(array, model.id);
                });
            }
        };

        App.reqres.setHandler('resource:entity', function(id) {
            return API.getEntity(id);
        });

        App.reqres.setHandler('resource:entities', function(array) {
            return API.getEntities(array);
        });

    });

    return;
});