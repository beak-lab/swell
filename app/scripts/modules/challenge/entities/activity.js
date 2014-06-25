'use strict';
define(['app'], function(App) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var contextName = 'Activity.Entity';
        Entities.Activity = Backbone.Model.extend({
            urlRoot: 'activity',

            defaults: {
                title: 'Default title',
                label: 'Default Label',
                description: 'Default description',
                question: 'Default question',
                leftLabel: 'Worst',
                rightLabel: 'Best'
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
                    id: 4,
                    weight: 1,
                    type: 'Slideable',
                    title: 'Activity 2: Why, When and How',
                    question: 'Will the employer discriminate against me or not?',
                    description: '<p>It\'s illegal for employers to refuse a job to someone because they have a diagnosis of mental illness but it is very hard to prove they have done this.</p><p>In your experience how much do employers discriminate against people with mental distress?</p>',
                    leftLabel: 'Not Much',
                    rightLabel: 'All the freaking time'
                }, {
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
                }
            ]);
        };

        var API = {
            getActivityEntity: function(id) {
                if (undefined === Entities.fakes) {
                    initializeFakes();
                }

                var model = Entities.fakes.findWhere({
                    id: parseInt(id, 10)
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