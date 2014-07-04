'use strict';
define(['app', 'domain_goal_view', 'domain_entity'], function(App, View) {
    App.module('Domain.Goal', function (Goal, App, Backbone, Marionette, $) { // , _
        Goal.Controller = {
            show: function(slug) {

                // var fetchingDomain = App.request('domain:entities', slug);

                var layout = new View.Layout();
                App.mainRegion.show(layout);
                // $.when(fetchingDomain).done(function(domain) {

                    // var view = new View.Domain({
                    //     collection: domain
                    // });

                    // layout.mainRegion.show(view);
                // });
            }
        };
    });
    return App.Domain.Goal.Controller;
});