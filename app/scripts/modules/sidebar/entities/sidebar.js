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
                    title: 'Goal Set',
                    text: 'Eat no sugar for 1 week',
                    icon: 'icon-tick-empty.svg'
                },{
                    title: 'Challenge Completed',
                    text: 'I want to sort out my sleep',
                    icon: 'icon-challenge-complete.svg'
                },{
                    title: 'Story Added',
                    text: 'How I beat the big black bear',
                    icon: 'icon-story.svg'
                },{
                    title: 'Goal Scored',
                    text: '\“Go for 5 swims\” got smashed out of the park',
                    icon: 'icon-tick-full.svg'
                },{
                    title: 'New Comment',
                    text: 'Felix the cat commented on one of your goals',
                    icon: 'icon-comment.svg'
                },{
                    title: 'Goal Set',
                    text: 'Go for 5 swims',
                    icon: 'icon-tick-empty.svg'
                },{
                    title: 'Maru Buddied Up',
                    text: 'Greg Swan is on the scene',
                    icon: 'icon-buddy.svg'
                },{
                    title: 'Welcome Aboard',
                    text: 'Maru O’Hagan got Swell',
                    icon: 'icon-star.svg'
                }

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