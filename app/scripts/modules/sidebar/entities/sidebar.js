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
                    text: 'Apply for part time jobs in IT',
                    icon: 'icon-tick-empty.svg'
                },{
                    title: 'Goal Scored',
                    text: 'Do what colour is your parachute online course',
                    icon: 'icon-tick-full.svg'
                },{
                    title: 'New Comment',
                    text: 'Moira Anau – congratulations on finishing the parachute course! You rock!!',
                    icon: 'icon-comment.svg'
                },{
                    title: 'Challenge Completed',
                    text: 'I want to sort out my sleep',
                    icon: 'icon-challenge-complete.svg'
                },{
                    title: 'Reminders',
                    text: 'Starting looking for work: 15 October',
                    icon: 'icon-alarmclock.svg'
                },{
                    title: 'New stuff',
                    text: 'Gary\'s recovery story on disclosure',
                    icon: 'icon-story.svg'
                },{
                    title: 'Maru Buddied Up',
                    text: 'Greg Swan is on the scene',
                    icon: 'icon-buddy.svg'
                },{
                    title: 'Welcome Aboard',
                    text: 'Maru George got Swell',
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