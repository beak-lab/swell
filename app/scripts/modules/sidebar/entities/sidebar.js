'use strict';
define(['app', 'backbone.picky'], function(App) {
    App.module('Entities', function(Entities, App, Backbone) {
        Entities.Sidebar = Backbone.Model.extend({
        });

        Entities.SidebarCollection = Backbone.Collection.extend({
            model: Entities.Sidebar,
        });

        var initializeSidebars = function() {
            Entities.sidebar = new Entities.SidebarCollection([
                {
                    name: '324234',
                    slug: 'domains',
                },
                {
                    name: 'Cha23432424llenges',
                    slug: 'challenges',
                },
                {
                    name: '234324',
                    slug: 'profile',
                },
            ]);
        };

        var API = {
            getHistory: function() {
                if(Entities.sidebar === undefined) {
                    initializeSidebars();
                }

                return Entities.sidebar;
            },

        };

        App.reqres.setHandler('sidebar:history', function(){
            return API.getHistory();
        });
    });

    return;
});