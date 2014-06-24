'use strict';
define(['app'], function(App) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var contextName = 'Challenge.Entity';
        Entities.Challenge = Backbone.Model.extend({
            urlRoot: 'challenge',

            defaults: {
                name: '',
                slug: ''
            },

            validate: function(attrs) { // , options
                var errors = {};
                if (!attrs.fileName) {
                    errors.fileName = 'can\'t be blank';
                }
                //     if (! attrs.somethingelse) {
                //       errors.lastName = 'can't be blank';
                //     }
                //     else{
                //       if (attrs.somethingelse.length < 2) {
                //         errors.somethingelse = 'is too short';
                //       }
                //     }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        });

        Entities.ChallengeCollection = Backbone.Collection.extend({
            url: '/challanges',
            model: Entities.Challenge
        });

        var initializeChallenges = function() {
            App.log('Initializing Fake Challenges', contextName, 1);

            Entities.fakeChallenges = new Entities.ChallengeCollection([
                {
                    id: 0,
                    name: 'I want to discover and use my talents',
                    desc: 'A description of the challenge. About this many words: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dolor turpis, mollis a mauris quis, tempor dignissim nunc. Donec at quam ornare, rutrum nisl ac, iaculis lacus. Nunc in semper purus, eget viverra lacus. Phasellus sit amet libero ac arcu eleifend vestibulum. Sed eget venenatis eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin at sodales dolor.',
                    slug: 'work-talents',
                    resources: [
                        {
                            name: 'Document One'
                        }
                    ],
                    domain: 4,
                    activity: 0
                },{
                    id: 1,
                    name: 'I want to start a business',
                    desc: 'A description of the challenge. About this many words: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dolor turpis, mollis a mauris quis, tempor dignissim nunc. Donec at quam ornare, rutrum nisl ac, iaculis lacus. Nunc in semper purus, eget viverra lacus. Phasellus sit amet libero ac arcu eleifend vestibulum. Sed eget venenatis eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin at sodales dolor.',
                    slug: 'work-business',
                    domain: 4,
                    activity: 1
                },{
                    id: 2,
                    name: 'I want to find ways to make a contribution to society',
                    desc: 'A description of the challenge. About this many words: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dolor turpis, mollis a mauris quis, tempor dignissim nunc. Donec at quam ornare, rutrum nisl ac, iaculis lacus. Nunc in semper purus, eget viverra lacus. Phasellus sit amet libero ac arcu eleifend vestibulum. Sed eget venenatis eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin at sodales dolor.',
                    slug: 'work-society',
                    domain: 4,
                },{
                    id: 3,
                    name: 'I want to continue my education',
                    desc: 'A description of the challenge. About this many words: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dolor turpis, mollis a mauris quis, tempor dignissim nunc. Donec at quam ornare, rutrum nisl ac, iaculis lacus. Nunc in semper purus, eget viverra lacus. Phasellus sit amet libero ac arcu eleifend vestibulum. Sed eget venenatis eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin at sodales dolor.',
                    slug: 'work-education',
                    domain: 4,
                },{
                    id: 4,
                    name: 'I want to get a job after a period of unemployment',
                    desc: 'A description of the challenge. About this many words: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dolor turpis, mollis a mauris quis, tempor dignissim nunc. Donec at quam ornare, rutrum nisl ac, iaculis lacus. Nunc in semper purus, eget viverra lacus. Phasellus sit amet libero ac arcu eleifend vestibulum. Sed eget venenatis eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin at sodales dolor.',
                    slug: 'work-unemployment',
                    domain: 4,
                },{
                    id: 5,
                    name: 'I want to know if and when to disclose',
                    desc: 'A description of the challenge. About this many words: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dolor turpis, mollis a mauris quis, tempor dignissim nunc. Donec at quam ornare, rutrum nisl ac, iaculis lacus. Nunc in semper purus, eget viverra lacus. Phasellus sit amet libero ac arcu eleifend vestibulum. Sed eget venenatis eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin at sodales dolor.',
                    slug: 'work-disclose',
                    domain: 4,
                },{
                    id: 6,
                    name: 'I want to negotiate my work conditions',
                    desc: 'A description of the challenge. About this many words: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dolor turpis, mollis a mauris quis, tempor dignissim nunc. Donec at quam ornare, rutrum nisl ac, iaculis lacus. Nunc in semper purus, eget viverra lacus. Phasellus sit amet libero ac arcu eleifend vestibulum. Sed eget venenatis eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin at sodales dolor.',
                    slug: 'work-negotiate',
                    domain: 4,
                },{
                    name: 'I want to keep my job',
                    id: 7,
                    desc: 'A description of the challenge. About this many words: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dolor turpis, mollis a mauris quis, tempor dignissim nunc. Donec at quam ornare, rutrum nisl ac, iaculis lacus. Nunc in semper purus, eget viverra lacus. Phasellus sit amet libero ac arcu eleifend vestibulum. Sed eget venenatis eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin at sodales dolor.',
                    slug: 'work-keepmyjob',
                    domain: 4,
                }
            ]);

            return Entities.fakeChallenges;
        };

        var API = {
            getChallengeEntities: function() {
                if (undefined === Entities.fakeChallenges) {
                    initializeChallenges();
                }
                return Entities.fakeChallenges;
            },

            getChallengeEntity: function(id) {
                if (undefined === Entities.fakeChallenges) {
                    initializeChallenges();
                }

                var model = Entities.fakeChallenges.findWhere({
                    id: parseInt(id, 10)
                });

                return model;
            },

            getChallengeByDomain: function(domain) {
                if (undefined === Entities.fakeChallenges) {
                    initializeChallenges();
                }

                var models = Entities.fakeChallenges.where({
                    // NOTE: this is a gotcha:
                    domain: parseInt(domain)
                });

                return new Entities.ChallengeCollection(models);
            },
        };

        App.reqres.setHandler('challenge:entities', function() {
            return API.getChallengeEntities();
        });

        App.reqres.setHandler('challenge:entity', function(id) {
            return API.getChallengeEntity(id);
        });

        App.reqres.setHandler('challenge:domain:entities', function(id) {
            return API.getChallengeByDomain(id);
        });

    });

    return;
});