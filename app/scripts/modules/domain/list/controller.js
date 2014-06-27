'use strict';
define(['app', 'domain_list_view'], function(App, View) {
    App.module('Domain.List', function (List, App, Backbone, Marionette, $) { // , _
        List.Controller = {
            listDomain: function() {
                require(['common_views', 'domain_entities'], function(CommonViews) {

                    // App.mainRegion.show(new CommonViews.Loading());

                    var fetchingDomain = App.request('domain:entities');

                    var layout = new View.Layout();
                    App.mainRegion.show(layout);

                    $.when(fetchingDomain).done(function(domain) {

                        var view = new View.Domain({
                            collection: domain
                        });

                        view.on('itemview:domain:show', function(childView, model) {
                            App.trigger('challenge:list', model.get('id'));
                        });

                        layout.domainRegion.show(view);
                    });
                });
            }
        };
    });
    return App.Domain.List.Controller;
});