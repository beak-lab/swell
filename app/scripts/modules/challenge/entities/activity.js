'use strict';
define(['app'], function(App) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var contextName = 'Activity.Entity';
        Entities.Activity = Backbone.Model.extend({
            urlRoot: 'activity',

            defaults: {
                title: 'Default title',
                label: 'Default Label',
                leftLabel: 'Worst',
                rightLabel: 'Best',
                topLabel: 'Pro',
                bottomLabel: 'Con'
            },
        });

        Entities.ActivityCollection = Backbone.Collection.extend({
            url: '/activity',
            model: Entities.Activity,
            comparator: 'weight'
        });

        var initializeFakes = function() {
            App.log('Initializing Fake Activitys', contextName, 1);

            Entities.fakes = new Entities.ActivityCollection([{
                id: 1,
                weight: 11,
                type: 'Slideable',
                title: 'Activity 2: Why, When and How',
                question: 'Will the employer discriminate against me or not?',
                description: '<p>It\'s illegal for employers to refuse a job to someone because they have a diagnosis of mental illness but it is very hard to prove they have done this.</p><p>In your experience how much do employers discriminate against people with mental distress?</p>',
                leftLabel: 'Not Much',
                rightLabel: 'All the freaking time'
            }, {
                id: 2,
                weight: 20,
                type: 'Radioable',
                title: 'Activity 2: Why, When and How',
                question: 'Do I need to negotiate work conditions related to my distress',
                description: 'Like starting late, flexible sick leave, quiet work space',
                data: [{
                    value: 'yes',
                    text: 'Yes',
                    subtext: 'it\'s probably a good idea to disclose'
                }, {
                    value: 'no',
                    text: 'No',
                    subtext: 'you probably don\'t need to disclose'
                }]
            }, {
                id: 3,
                weight: 30,
                type: 'Sortable',
                data: [{
                    name: 'Item 1'
                }, {
                    name: 'Item 2'
                }, {
                    name: 'Item 3'
                }, {
                    name: 'Item 4'
                }, ]
            }, {
                id: 4,
                weight: 40,
                type: 'Sortable',
                data: [{
                    name: 'Item 1'
                }, {
                    name: 'Item 2'
                }, {
                    name: 'Item 3'
                }, {
                    name: 'Item 4'
                }, ]
            }, {
                id: 5,
                weight: 50,
                type: 'Draggable',
                title: 'Activity 2: Why, When and How',
                description: 'Say what you have learnt from your experience that would help you do the job?',
                question: 'What have you learnt?',
                data: {
                    draggable: [{
                        name: 'Resilience'
                    }, {
                        name: 'Compassion'
                    }, {
                        name: 'Patience'
                    }, {
                        name: 'Gratitude'
                    }, ]
                }
            }, {
                id: 6,
                weight: 60,
                type: 'Checkboxable',
                title: 'Activity 2: Why, When and How',
                question: 'When',
                data: [{
                        text: 'Before they decide to employ me',
                        subtext: 'if you think your distress will interfere with your ability to do the job'
                    }, {
                        text: 'After they offer me the job',
                        subtext: 'if you want to negotiate your work conditions'
                    }, {
                        text: 'As part of everyday conversation',
                        subtext: 'if you feel safe'
                    }, {
                        text: 'When things go pear shaped',
                        subtext: 'if you think they need to understand what\'s going on.'
                    },

                ]
            }, {
                id: 7,
                weight: 70,
                type: 'Draggable',
                title: 'Activity 2: Why, When and How',
                description: 'Say what you have learnt from your experience that will help you manage your condition',
                question: 'How do you manage it?',
                data: {
                    draggable: [{
                        name: 'Healthy lifestyle'
                    }, {
                        name: 'Managing routines'
                    }, {
                        name: 'Managing stress'
                    }, ]
                }
            }, {
                id: 8,
                weight: 80,
                type: 'Draggable',
                title: 'Activity 2: Why, When and How',
                description: 'Say what work conditions enable you to do your best',
                question: 'What working conditions are the most important?',
                data: {
                    draggable: [{
                        name: 'Sick leave'
                    }, {
                        name: 'Work hours'
                    }, {
                        name: 'Work space'
                    }, ]
                }
            }, {
                id: 9,
                weight: 1,
                type: 'Voteable',
                title: 'Activity 1: Pros and Cons',
                question: 'what do you think about:',
                data: [{
                    name: 'I may not get the job'
                }, {
                    name: 'I don\'t have to hide my experience'
                }, {
                    name: 'I may be not be trusted to do the work'
                }, {
                    name: 'I can reduce stigma if I disclose with confidence'
                }, {
                    name: 'I may be treated differently by my workmates'
                }, {
                    name: 'I can negotiate work conditions related to my distress'
                }, ]
            }]);
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