'use strict';
define(['app'], function(App) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var contextName = 'Activity.Entity';
        Entities.Activity = Backbone.Model.extend({
            urlRoot: 'activity',

            defaults: {
                label: 'Default Label',
                description: 'Default description',
                question: 'Default question',
                leftLabel: 'Best',
                rightLabel: 'Worst'
            },
        });

        Entities.ActivityCollection = Backbone.Collection.extend({
            url: '/activity',
            model: Entities.Activity,
            comparator: 'weight'
        });

        var initializeFakes = function() {
            App.log('Initializing Fake Activitys', contextName, 1);

            Entities.fakes = new Entities.ActivityCollection([
                {
                    id: 1,
                    weight: 10,
                    type: 'Sortable',
                    data: [
                        { name: 'Item 1' },
                        { name: 'Item 2' },
                        { name: 'Item 3' },
                        { name: 'Item 4' },
                    ]
                }, {
                    id: 2,
                    weight: 9,
                    type: 'Sortable',
                    data: [
                        { name: 'Item 1' },
                        { name: 'Item 2' },
                        { name: 'Item 3' },
                        { name: 'Item 4' },
                    ]
                }, {
                    id: 3,
                    weight: 11,
                    type: 'Draggable',
                    data: {
                        draggable: [
                            { name: 'second set' },
                            { name: 'Item 23' },
                            { name: 'Item 34' },
                            { name: 'Item 4' },
                        ]
                    }
                }, {
                    id: 4,
                    weight: 2,
                    type: 'Slideable',
                    question: 'How do you feel?'
                }
            ]);
        };

        var API = {
            getActivityEntity: function(id) {
                if (undefined === Entities.fakes) {
                    initializeFakes();
                }

                var model = Entities.fakes.findWhere({
                    id: parseInt(id)
                });

                return model;
            },
            getActivityEntities: function(array) {
                if (undefined === Entities.fakes) {
                    initializeFakes();
                }

                return Entities.fakes.filter(function(model) {
                    return _.contains(array, model.id);
                });
            }
        };

        App.reqres.setHandler('activity:entities', function(array) {
            return API.getActivityEntities(array);
        });

        App.reqres.setHandler('activity:entity', function(id) {
            return API.getActivityEntity(id);
        });

    });

    return;
});