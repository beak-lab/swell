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
                desc: 'A very short description of the challenge. About this many words',
                slug: 'work-talents',
                domain: 4,
            },{
                id: 1, 
                name: 'I want to start a business',
                desc: 'A very short description of the challenge. About this many words',
                slug: 'work-business',
                domain: 4,
            },{
                id: 2, 
                name: 'I want to find ways to make a contribution to society',
                desc: 'A very short description of the challenge. About this many words',
                slug: 'work-society',
                domain: 4,
            },{
                id: 3, 
                name: 'I want to continue my education',
                desc: 'A very short description of the challenge. About this many words',
                slug: 'work-education',
                domain: 4,
            },{
                id: 4, 
                name: 'I want to get a job after a period of unemployment',
                desc: 'A very short description of the challenge. About this many words',
                slug: 'work-unemployment',
                domain: 4,
            },{
                id: 5, 
                name: 'I want to know if and when to disclose',
                desc: 'A very short description of the challenge. About this many words',
                slug: 'work-disclose',
                domain: 4,
            },{
                id: 6, 
                name: 'I want to negotiate my work conditions',
                desc: 'A very short description of the challenge. About this many words',
                slug: 'work-negotiate',
                domain: 4,
            },{
                name: 'I want to keep my job',
                id: 7,
                desc: 'A very short description of the challenge. About this many words',
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