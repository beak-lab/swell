'use strict';
define(['app'], function(App) {
    App.module('Entities', function(Entities, App, Backbone) {
        var contextName = 'Activity.Entity';
        Entities.Activity = Backbone.Model.extend({
            urlRoot: 'activity',
        });

        Entities.ActivityCollection = Backbone.Collection.extend({
            url: '/activity',
            model: Entities.Activity
        });

        var initializeActivitys = function() {
            App.log('Initializing Fake Activitys', contextName, 1);

            Entities.fakeActivitys = new Entities.ActivityCollection([{
                id: 1,
                type: 'sortable',
                data: [
                    {
                        id: 1,
                        name: 'Item 1',
                    },
                    {
                        id: 2,
                        name: 'Item 2',
                    },
                    {
                        id: 3,
                        name: 'Item 3',
                    },
                    {
                        id: 4,
                        name: 'Item 4',
                    },

                ]
            }, {
                id: 2,
                type: 'sortable',
                data: [
                    {
                        id: 1,
                        name: 'Item 1 second set',
                    },
                    {
                        id: 2,
                        name: 'Item 2',
                    },
                    {
                        id: 3,
                        name: 'Item 3',
                    },
                    {
                        id: 4,
                        name: 'Item 4',
                    },

                ]
            }]);
        };

        var API = {
            getActivityEntity: function(id) {
                if (undefined === Entities.fakeActivitys) {
                    initializeActivitys();
                }

                var model = Entities.fakeActivitys.findWhere({
                    id: parseInt(id)
                });

                return model;
            },
        };

        App.reqres.setHandler('activity:entity', function(id) {
            return API.getActivityEntity(id);
        });

    });

    return;
});