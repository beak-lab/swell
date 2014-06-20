'use strict';
define(['app'], function(App) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var contextName = 'User.Entity';
        Entities.User = Backbone.Model.extend({
            
            urlRoot: 'user',

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
        

        Entities.UserCollection = Backbone.Collection.extend({
            url: '/',
            model: Entities.User
        });

        var initializeUsers = function() {
            App.log('Initializing Fake Users', contextName, 1);

            var fakeUsers = new Entities.UserCollection([{
                name: 'First User',
                slug: 'page-1'
            }, {
                name: 'Second User',
                slug: 'page-2'
            }]);

            return fakeUsers;
        };
        
        var API = {
            getUserEntity: function(id) {
                var model = new Entities.User(id);
                App.log('Made new object: ' + id, contextName, 1);
                return model;
            },

            
            getUserEntities: function() {
                App.log('user:entities event detected', contextName, 1);
                var userCollection = new Entities.UserCollection();
                userCollection.reset(initializeUsers().models); // update the collection
                return userCollection;
            },

            getUserEntitiesPromises: function() {
                App.log('user:entities event detected', contextName, 1);
                var userCollection = new Entities.UserCollection();
                var defer = $.Deferred();
                userCollection.fetch({
                    complete: function() {
                        defer.resolve(userCollection); // send back the collection
                    },
                    // success: function(data){
                    //     App.log('success data', contextName, 1);
                    //     defer.resolve(data);
                    // }
                });
                // chain the above promise,
                var promise = defer.promise();
                $.when(promise).done(function(userCollection) {
                    // check to see if it had content:
                    if (userCollection.length === 0) { // if not, get defaults.
                        // FAKE NETWORK LAG
                        setTimeout(function() {
                            // App.trigger('page:register', models); // add each user to the menu
                            // if we don't have any imageCollection yet, create some for convenience
                            userCollection.reset(initializeUsers().models); // update the collection
                        }, 2000);

                    }
                });
                return promise;
            },
            
        };
        
        App.reqres.setHandler('user:entities', function() {
            return API.getUserEntities();
        });

        App.reqres.setHandler('user:entity:new', function(id) {
            return API.getUserEntity(id);
        });
        
    });

    return;
});