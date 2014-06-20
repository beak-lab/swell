'use strict';
define(['app', 'domain_list_view'], function(App, View) {
    App.module('DomainApp.List', function (List, App, Backbone, Marionette, $) { // , _
        List.Controller = {
            listDomain: function() {
                require(['common/views', 'domain_entities'], function(CommonViews) {

                    App.mainRegion.show(new CommonViews.Loading());

                    var fetchingDomain = App.request('domain:entities');

                    var domainListLayout = new View.Layout();
                    // var domainListPanel = new View.Panel();

                    $.when(fetchingDomain).done(function(domain) {
                        // App.log('Fetched domain data', 'App', 1);

                        var domainListView = new View.Domain({
                            collection: domain
                        });

                        // domainListLayout.on('show', function() {
                        //   domainListLayout.panelRegion.show(domainsListPanel);
                        //   domainListLayout.domainRegion.show(domainListView);
                        // });

                        // domainListView.on('itemview:domain:show', function(childView, model) {
                        //   App.trigger('domain:show', model.get('id'));
                        // });

                        domainListView.on('itemview:domain:delete', function(childView, model) {
                            // auto magically call's remove in the view.
                            model.destroy();
                        });

                        // when the data is here, show it in this region
                        domainListLayout.domainRegion.show(domainListView);

                    });

                    // show the whole layout
                    App.mainRegion.show(domainListLayout);

                });
            }
        };
    });
    return App.DomainApp.List.Controller;
});