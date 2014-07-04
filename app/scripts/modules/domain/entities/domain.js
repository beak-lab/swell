define(['app'], function(App) {
    'use strict';
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var contextName = 'Entity';
        Entities.Domain = Backbone.Model.extend({
            urlRoot: 'domain',
        });

        Entities.DomainCollection = Backbone.Collection.extend({
            url: '/domains',
            model: Entities.Domain
        });

        var initializeDomains = function() {
            App.log('Initializing Fake Domains', contextName, 1);

            Entities.fakeDomains = new Entities.DomainCollection([
            {
                id: 1,
                name: 'Personal meaning',
                slug: 'personal-meaning',
                desc: 'What’s the meaning and purpose of my life?',
                cssClass: 'personal-meaning',
                goals: Math.round(Math.random()*4) + 1
            }, {
                id: 2,
                name: 'Self-belief',
                slug: 'self-belief',
                desc: 'How can I feel better about myself?',
                cssClass: 'self-belief',
                goals: Math.round(Math.random()*4) + 1
            }, {
                id: 3,
                name: 'Relationships',
                slug: 'relationships',
                desc: 'How can I develop better relationships?',
                cssClass: 'relationships',
                goals: Math.round(Math.random()*4) + 1
            }, {
                id: 4,
                name: 'Self-management',
                slug: 'self-management',
                desc: 'How can I self-manage my distress?',
                cssClass: 'self-management',
                goals: Math.round(Math.random()*4) + 1
            }, {
                id: 5,
                name: 'Work',
                slug: 'work',
                desc: 'How can I make a contribution to society?',
                cssClass: 'work',
                goals: Math.round(Math.random()*4) + 1
            }, {
                id: 6,
                name: 'Lifestyle',
                slug: 'lifestyle',
                desc: 'How can I lead a healthy lifestyle?',
                cssClass: 'lifestyle',
                goals: Math.round(Math.random()*4) + 1
            }, {
                id: 7,
                name: 'Services',
                slug: 'services',
                desc: 'How can I get what I need from services?',
                cssClass: 'services',
                goals: Math.round(Math.random()*4) + 1
            },{
                id: 8,
                name: 'Money',
                slug: 'money',
                desc: 'How can I manage or grow my income?',
                cssClass: 'money',
                goals: Math.round(Math.random()*4) + 1
            }
            ]);
        };

        var API = {
            getDomainEntity: function(slug) {
                if (undefined === Entities.fakeDomains) {
                    initializeDomains();
                }

                var models;

                if (typeof slug === 'string') {
                    models = Entities.fakeDomains.findWhere({
                        slug: slug
                    });
                } else {
                    models = Entities.fakeDomains.findWhere({
                        // NOTE: this is a gotcha:
                        id: parseInt(slug)
                    });
                }

                return models;
            },
            getDomainEntities: function() {
                App.log('domain:entities event detected', contextName, 2);

                if (undefined === Entities.fakeDomains) {
                    initializeDomains();
                }
                return Entities.fakeDomains;

                // var defer = $.Deferred();
                // domainCollection.fetch({
                //     complete: function() {
                //         defer.resolve(domainCollection); // send back the collection
                //     },
                //     // success: function(data){
                //     //     App.log('success data', contextName, 1);
                //     //     defer.resolve(data);
                //     // }
                // });
                // // chain the above promise,
                // var promise = defer.promise();
                // $.when(promise).done(function(domainCollection) {
                //     // check to see if it had content:
                //     if (domainCollection.length === 0) { // if not, get defaults.
                //         // FAKE NETWORK LAG
                //         setTimeout(function() {
                //             // App.trigger('page:register', models); // add each domain to the menu
                //             // if we don't have any imageCollection yet, create some for convenience
                //             domainCollection.reset(initializeDomains().models); // update the collection
                //         }, 1);

                //     }
                // });
                // return promise;
            },

        };

        App.reqres.setHandler('domain:entity', function(slug) {
            return API.getDomainEntity(slug);
        });

        App.reqres.setHandler('domain:entities', function() {
            return API.getDomainEntities();
        });

    });

    return;
});