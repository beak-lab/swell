'use strict';
define(['app', 'domain_list_view'], function(App, View) {
    App.module('Domain.List', function (List, App, Backbone, Marionette, $) { // , _
        List.Controller = {
            listDomain: function() {
                require(['common_views', 'domain_entities'], function(CommonViews) {

                    App.mainRegion.show(new CommonViews.Loading());

                    var fetchingDomain = App.request('domain:entities');

                    var layout = new View.Layout();
                    // var domainListPanel = new View.Panel();

                    $.when(fetchingDomain).done(function(domain) {
                        // App.log('Fetched domain data', 'App', 1);

                        var view = new View.Domain({
                            collection: domain
                        });

                        view.on('itemview:domain:show', function(childView, model) {
                            App.trigger('challenge:list', model.get('id'));
                        });

                        // layout.on('show', function() {
                        //   layout.panelRegion.show(domainsListPanel);
                        //   layout.domainRegion.show(view);
                        // });

                        // view.on('itemview:domain:show', function(childView, model) {
                        //   App.trigger('domain:show', model.get('id'));
                        // });

                        view.on('itemview:domain:delete', function(childView, model) {
                            // auto magically call's remove in the view.
                            model.destroy();
                        });

                        // when the data is here, show it in this region
                        layout.domainRegion.show(view);

                    });

                    // show the whole layout
                    App.mainRegion.show(layout);

                });
            }
        };
    });
    return App.Domain.List.Controller;
});