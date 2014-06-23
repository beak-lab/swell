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
                name: 'First Challenge',
                slug: 'page-1',
                domain: 0
            }, {
                id: 2,
                name: 'Second Challenge',
                slug: 'page-2',
                domain: 0
            }, {
                id: 3,
                name: 'Third Challenge',
                slug: 'page-3',
                domain: 1
            }, {
                id: 4,
                name: 'Forth Challenge',
                slug: 'page-4',
                domain: 1
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
                    id: id
                });
                // var model = new Entities.Challenge(id);
                return model;
            },

            getChallengeByDomain: function(domain) {
                if (undefined === Entities.fakeChallenges) {
                    initializeChallenges();
                }

                var models = Entities.fakeChallenges.where({
                    domain: domain
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