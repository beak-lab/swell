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
                bottomLabel: 'Con',
                goal: false
            },
        });

        Entities.ActivityCollection = Backbone.Collection.extend({
            url: '/activity',
            model: Entities.Activity,
            localStorage: new Backbone.LocalStorage('ActivityCollection'),
            comparator: 'weight'
        });

        var initializeFakes = function() {
            App.log('Initializing Fake Activitys', contextName, 1);

            Entities.fakes = new Entities.ActivityCollection([{
                id: 1,
                weight: 1,
                type: 'Slideable',
                title: 'Activity 2: Why, When and How',
                question: 'Will the employer discriminate against me or not?',
                description: '<p>It\'s illegal for employers to refuse a job to someone because they have a diagnosis of mental illness but it is very hard to prove they have done this.</p><p>In your experience how much do employers discriminate against people with mental distress?</p>',
                leftLabel: 'Not Much',
                rightLabel: 'All the time'
            }, {
                id: 2,
                weight: 2,
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
                weight: 13,
                type: 'Draggable',
                title: 'Activity 3: Positive disclosure',
                question: 'What I learned from <strong>my lived experience</strong> that will help me do the job',
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
                id: 5,
                weight: 11,
                type: 'Checkboxable',
                title: 'Activity 3: When to disclose',
                upperDescription: 'Picking the right time to bring up your experience can make a big difference to how it\'s recieved as well as the headspace you\'re in. Deciding if and when to disclose ahead of time puts you in charge of the conversation',
                question: 'When should I disclose (if at all)?',
                data: [{
                        text: 'I believe my distress will interfere with my ability to do the job',
                        subtext: 'Disclose before they decide to employ me',
                        goalText: 'Disclose before they decide to employ you'
                    }, {
                        text: 'I want to negotiate work conditions related to my distress',
                        subtext: 'Disclose just after they offer you the job',
                        goalText: 'Disclose my experience before I accept a job'
                    }, {
                        text: 'I want to let my employer know when I\'m struggling',
                        subtext: 'Disclose when you start struggling - don\'t wait too long',
                        goalText: 'Disclose my experience when I feel like it\'s affecting my work'
                    }, {
                        text: 'My lived experience has no impact on my work',
                        subtext: 'No need to disclose',
                        goalText: 'Don\'t disclose my experience to my employer (unless I want to)'
                    }
                ]
            }, {
                id: 6,
                weight: 14,
                type: 'Draggable',
                title: 'Activity 3: Positive disclosure',
                // description: 'Say what you have learnt from your experience that will help you manage your condition',
                question: 'What I have learnt about <strong>self-managing my condition</strong> that will help me do the job',
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
                id: 7,
                weight: 15,
                type: 'Draggable',
                title: 'Activity 3: Positive disclosure',
                question: 'The work conditions I thrive under',
                data: {
                    draggable: [{
                        name: 'Flexible sick leave'
                    }, {
                        name: 'Flexible work hours'
                    }, {
                        name: 'Quiet work spaces'
                    }, ]
                }
            }, {
                id: 8,
                weight: 10,
                type: 'Voteable',
                title: 'Activity 1: Pros and Cons',
                question: 'What are the pros and cons of disclosing to employers?',
                // upperDescription: 'You don\'t have to disclose you have a diagnosis when you are applying for a job unless you think it will stop you from being able to do the job. There are pros and cons to disclosing.',
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
            },{
                id: 9,
                weight: 12,
                type: 'Staticable',
                title: 'Activity 3: When I do disclose',
                upperDescription: 'When you disclose don\'t be negative or apologetic. Turn it into an opportunity to sell your strengths.',
                data: [
                    {   
                        container: 'h2',
                        content : 'Make it positive by explaining:',
                    },
                    {
                        container: 'ol',
                        cssClass: 'big-ol',
                        content: '<li>What I learnt from my lived experience that would help me to the job</li><li>What I have learnt about self-managing my condition that will help me do the job.</li><li>The work conditions I thrive under.</li>'
                    },{
                        container: 'h3',
                        content: 'Lets go into more detail...'
                    }
                ]
            }]);
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