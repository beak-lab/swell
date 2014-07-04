'use strict';
define(['app', 'templates', 'dust', 'dustIterate'], function(App) {
    App.module('Domain.Show.View', function(View, App, Backbone, Marionette) {
        View.Layout = Marionette.Layout.extend({
            template: 'domain_goal_show',

            regions: {
                mainRegion: '#domain_goals',
            },

        });

        View.Goals = Marionette.ItemView.extend({
            template: 'domain_goals',

            serializeData: function() {
                return {
                    goals: this.options.goals
                };
            },
        });
    });

    return App.Domain.Show.View;
});