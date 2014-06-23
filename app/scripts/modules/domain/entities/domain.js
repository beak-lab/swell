define(['app'], function(App) {
    'use strict';
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var contextName = 'Entity';
        Entities.Domain = Backbone.Model.extend({
            urlRoot: 'domain',

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

        Entities.DomainCollection = Backbone.Collection.extend({
            url: '/domains',
            model: Entities.Domain
        });

        var initializeDomains = function() {
            App.log('Initializing Fake Domains', contextName, 1);

            var fakeDomains = new Entities.DomainCollection([
            {
                id: 0,
                name: 'Personal meaning',
                slug: 'personal-meaning',
                desc: 'A very short description of the challenge. About this many words',
                cssClass: 'personal-meaning',
            }, {
                id: 1,
                name: 'Self-belief',
                slug: 'self-belief',
                desc: 'A very short description of the challenge. About this many words',
                cssClass: 'self-belief',
            }, {
                id: 2,
                name: 'Relationships',
                slug: 'relationships',
                desc: 'A very short description of the challenge. About this many words',
                cssClass: 'relationships',
            }, {
                id: 3,
                name: 'Self-management',
                slug: 'self-management',
                desc: 'A very short description of the challenge. About this many words',
                cssClass: 'self-management',
            }, {
                id: 4,
                name: 'Work',
                slug: 'work',
                desc: 'A very short description of the challenge. About this many words',
                cssClass: 'work',
            }, {
                id: 5,
                name: 'Lifestyle',
                slug: 'lifestyle',
                desc: 'A very short description of the challenge. About this many words',
                cssClass: 'lifestyle',
            }, {
                id: 6,
                name: 'Services',
                slug: 'services',
                desc: 'A very short description of the challenge. About this many words',
                cssClass: 'services',
            }
            ]);

            return fakeDomains;
        };

        var API = {
            getDomainEntities: function() {
                App.log('domain:entities event detected', contextName, 1);
                var domainCollection = new Entities.DomainCollection();
                var defer = $.Deferred();
                domainCollection.fetch({
                    complete: function() {
                        defer.resolve(domainCollection); // send back the collection
                    },
                    // success: function(data){
                    //     App.log('success data', contextName, 1);
                    //     defer.resolve(data);
                    // }
                });
                // chain the above promise,
                var promise = defer.promise();
                $.when(promise).done(function(domainCollection) {
                    // check to see if it had content:
                    if (domainCollection.length === 0) { // if not, get defaults.
                        // FAKE NETWORK LAG
                        setTimeout(function() {
                            // App.trigger('page:register', models); // add each domain to the menu
                            // if we don't have any imageCollection yet, create some for convenience
                            domainCollection.reset(initializeDomains().models); // update the collection
                        }, 1);

                    }
                });
                return promise;
            },

        };

        App.reqres.setHandler('domain:entities', function() {
            return API.getDomainEntities();
        });

        // App.reqres.setHandler('domain:entity', function(id) {
        // return API.getDomainEntity(id);
        // });

        App.reqres.setHandler('images:entity:new', function(id) {
            App.log('Making new image: ' + id, this.name, 1);
            return new Entities.Domain();
        });
    });

    return;
});