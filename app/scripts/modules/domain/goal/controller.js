'use strict';
define(['app', 'domain_goal_view', 'domain_entities'], function(App, View) {
    App.module('Domain.Goal', function (Goal, App, Backbone, Marionette, $) { // , _
        Goal.Controller = {
            show: function() {

                var fetchingDomain = App.request('domain:entities');

                var layout = new View.Layout();
                App.mainRegion.show(layout);

console.log('there');
                $.when(fetchingDomain).done(function(domain) {
console.log('here');
                    var view = new View.Domain({
                        collection: domain
                    });

                    view.on('itemview:domain:show', function(childView, model) {
                        App.trigger('challenge:Goal', model.get('id'));
                    });

                    layout.domainRegion.show(view);
                });
            }
        };
    });
    return App.Domain.Goal.Controller;
});