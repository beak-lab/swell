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
            url: '/',
            model: Entities.Challenge
        });

        var initializeChallenges = function() {
            App.log('Initializing Fake Challenges', contextName, 1);

            var fakeChallenges = new Entities.ChallengeCollection([{
                name: 'First Challenge',
                slug: 'page-1'
            }, {
                name: 'Second Challenge',
                slug: 'page-2'
            }]);

            return fakeChallenges;
        };
        
        var API = {
            getChallengeEntity: function(id) {
                var model = new Entities.Challenge(id);
                App.log('Made new object: ' + id, contextName, 1);
                return model;
            },

            
            getChallengeEntities: function() {
                App.log('challenge:entities event detected', contextName, 1);
                var challengeCollection = new Entities.ChallengeCollection();
                challengeCollection.reset(initializeChallenges().models); // update the collection
                return challengeCollection;
            },

            getChallengeEntitiesPromises: function() {
                App.log('challenge:entities event detected', contextName, 1);
                var challengeCollection = new Entities.ChallengeCollection();
                var defer = $.Deferred();
                challengeCollection.fetch({
                    complete: function() {
                        defer.resolve(challengeCollection); // send back the collection
                    },
                    // success: function(data){
                    //     App.log('success data', contextName, 1);
                    //     defer.resolve(data);
                    // }
                });
                // chain the above promise,
                var promise = defer.promise();
                $.when(promise).done(function(challengeCollection) {
                    // check to see if it had content:
                    if (challengeCollection.length === 0) { // if not, get defaults.
                        // FAKE NETWORK LAG
                        setTimeout(function() {
                            // App.trigger('page:register', models); // add each challenge to the menu
                            // if we don't have any imageCollection yet, create some for convenience
                            challengeCollection.reset(initializeChallenges().models); // update the collection
                        }, 2000);

                    }
                });
                return promise;
            },
            
        };
        
        App.reqres.setHandler('challenge:entities', function() {
            return API.getChallengeEntities();
        });

        App.reqres.setHandler('challenge:entity:new', function(id) {
            return API.getChallengeEntity(id);
        });
        
    });

    return;
});