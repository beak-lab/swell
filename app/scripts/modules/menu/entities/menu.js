'use strict';
define(['app', 'backbone.picky'], function(App) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var contextName = 'Menu.Entity';

        Entities.Menu = Backbone.Model.extend({
            initialize: function() {
                Backbone.Picky.Selectable.mixInto(this);
            }
        });

        Entities.MenuCollection = Backbone.Collection.extend({
            model: Entities.Menu,

            initialize: function() {
                // Backbone.Picky.SingleSelect.mixInto(this);
            }
        });

        var initializeMenus = function() {
            Entities.menus = new Entities.MenuCollection([
                {
                    name: 'Domains',
                    slug: 'domains',
                    trigger: 'domain:list'
                },
                {
                    name: 'Challenges',
                    slug: 'challenges',
                    trigger: 'challenge:list'
                },
                {
                    name: 'Profile',
                    slug: 'profile',
                    trigger: 'user:profile'
                },
            ]);
        };

        var API = {
            getMenuEntity: function(id) {
                var model = new Entities.Menu(id);
                App.log('Made new object: ' + id, contextName, 1);
                return model;
            },
            getMenus: function() {
                // var collection = new Entities.MenuCollection();
                if(Entities.menus === undefined) {
                    App.log('Creating menus', contextName, 1);
                    initializeMenus();
                }

                return Entities.menus;
            },

        };

        App.reqres.setHandler('menu:entities', function(){
            App.log('Event caught: menu:entities ', contextName, 2);
            return API.getMenus();
        });
    });

    return;
});