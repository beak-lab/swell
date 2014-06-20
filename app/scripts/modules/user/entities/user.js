'use strict';
define(['app'], function(App) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var contextName = 'User.Entity';
        Entities.User = Backbone.Model.extend({
            // urlRoot: 'user',
            url: function() {
                return App.API + '/user';
            },
            validate: function(attrs) { // , options
                var errors = {};
                if (!attrs.password) {
                    errors.password = 'can\'t be blank';
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

        var API = {
            getUser: function() {
                var model = new Entities.User(id);
                App.log('Made new object: ' + id, contextName, 1);
                return model;
            },
        };

        App.reqres.setHandler('user:profile', function() {
            return API.getUser();
        });

    });

    return;
});