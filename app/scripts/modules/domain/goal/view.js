'use strict';
define(['app', 'templates', 'dust'], function(App) {
    App.module('Domain.Show.View', function(View, App, Backbone, Marionette, $) {
        View.Layout = Marionette.Layout.extend({
            template: 'domain_goal_show',

            regions: {
                mainRegion: '#domain_goals',
            },

        });
    });

    return App.Domain.Show.View;
});