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
                    id: 1,
                    name: 'Discovering and using my talents',
                    desc: 'A very short description of the challenge. About this many words:Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti voluptatum ut, perferendis temporibus magnam velit qui necessitatibus officia deserunt inventore tempora architecto, illo nemo? Ab.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti voluptatum ut, perferendis temporibus magnam velit qui necessitatibus officia deserunt inventore tempora architecto, illo nemo? Ab.',
                    slug: 'work-talents',
                    domain: 5,
                    resources: [1, 2],
                    activities: [7, 8],
                    icon: 'icon-talents.svg',
                }, {
                    id: 2,
                    name: 'I want to start a business',
                    desc: 'A very short description of the challenge. About this many words:Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti voluptatum ut, perferendis temporibus magnam velit qui necessitatibus officia deserunt inventore tempora architecto, illo nemo? Ab.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti voluptatum ut, perferendis temporibus magnam velit qui necessitatibus officia deserunt inventore tempora architecto, illo nemo? Ab.',
                    slug: 'work-business',
                    domain: 5,
                    resources: [1],
                    activities: [6],
                    icon: 'icon-business.svg',
                }, {
                    id: 3,
                    name: 'I want to find ways to make a contribution to society',
                    desc: 'A very short description of the challenge. About this many words:Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti voluptatum ut, perferendis temporibus magnam velit qui necessitatibus officia deserunt inventore tempora architecto, illo nemo? Ab.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti voluptatum ut, perferendis temporibus magnam velit qui necessitatibus officia deserunt inventore tempora architecto, illo nemo? Ab.',
                    slug: 'work-society',
                    domain: 5,
                    resources: [1, 2, 3, 4],
                    activities: [4, 5, 6],
                    icon: 'icon-volunteer.svg',
                }, {
                    id: 4,
                    name: 'Continuing my education',
                    desc: 'A very short description of the challenge. About this many words:Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti voluptatum ut, perferendis temporibus magnam velit qui necessitatibus officia deserunt inventore tempora architecto, illo nemo? Ab.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti voluptatum ut, perferendis temporibus magnam velit qui necessitatibus officia deserunt inventore tempora architecto, illo nemo? Ab.',
                    slug: 'work-education',
                    domain: 5,
                    activities: [7],
                    icon: 'icon-degree.svg',
                }, {
                    id: 5,
                    name: 'Finding a job after unemployment',
                    desc: 'A very short description of the challenge. About this many words:Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti voluptatum ut, perferendis temporibus magnam velit qui necessitatibus officia deserunt inventore tempora architecto, illo nemo? Ab.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti voluptatum ut, perferendis temporibus magnam velit qui necessitatibus officia deserunt inventore tempora architecto, illo nemo? Ab.',
                    slug: 'work-unemployment',
                    domain: 5,
                    activities: [8],
                    icon: 'icon-briefcase.svg',
                }, {
                    id: 6,
                    name: 'Disclosing my lived experience to an employer ',
                    desc: 'You don\'t have to disclose you have a diagnosis when you are applying for a job, unless you think it will stop you from being able to do the job - but it still might be a good idea. Disclosing your mental distress can be risky and scary so it\'s important we make good decisions about if, when and how to',
                    slug: 'work-disclose',
                    domain: 5,
                    resources: [1, 2, 3, 4, 5],
                    activities: [4, 5, 6, 7, 8, 9],
                    icon: 'icon-flag.svg',
                }, {
                    id: 7,
                    name: 'Negotiating work conditions related to my distress ',
                    desc: 'A very short description of the challenge. About this many words:Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti voluptatum ut, perferendis temporibus magnam velit qui necessitatibus officia deserunt inventore tempora architecto, illo nemo? Ab.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti voluptatum ut, perferendis temporibus magnam velit qui necessitatibus officia deserunt inventore tempora architecto, illo nemo? Ab.',
                    slug: 'work-negotiate',
                    domain: 5,
                    activities: [],
                    icon: 'icon-handshake.svg',
                }, {
                    name: 'Keeping my job',
                    id: 8,
                    desc: 'A very short description of the challenge. About this many words:Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti voluptatum ut, perferendis temporibus magnam velit qui necessitatibus officia deserunt inventore tempora architecto, illo nemo? Ab.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti voluptatum ut, perferendis temporibus magnam velit qui necessitatibus officia deserunt inventore tempora architecto, illo nemo? Ab.',
                    slug: 'work-keepmyjob',
                    domain: 5,
                    activities: [],
                    icon: 'icon-ratrace.svg',
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
                    id: parseInt(id)
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