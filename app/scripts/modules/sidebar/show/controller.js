'use strict';
define(['app', 'sidebar_view', 'sidebar_entity', 'domain_entity'], function(App, View) {
    App.module('Sidebar', function (Sidebar, App, Backbone, Marionette, $) { // , _
        Sidebar.Controller = {
            setup: function() {
                var layout = new View.Layout();
                App.leftRegion.show(layout);

                layout.on('user:settings', function() {
                    App.snapper.close('left');
                    App.trigger('user:profile');
                });

                var view = new View.Left({
                    collection: App.request('sidebar:history')
                });

                var fetchingDomain = App.request('domain:entities');

                $.when(fetchingDomain).done(function(domains) {
                    var rightView = new View.Right({
                        collection: domains
                    });

                    rightView.on('itemview:goalClicked', function(e, object) {
                        App.snapper.close('right');
                        App.trigger('domain:goals', object.model.get('slug'));
                    });

                    App.rightRegion.show(rightView);
                });

                // Sidebar.Controller.sidebar.on('itemview:navigate', function(childView, model) {
                //     App.log('Navigating to: ' + model.get('trigger'), contextName, 1);
                //     App.trigger(model.get('trigger'));
                // });

                layout.regionManager.get('history').show(view);
            },

        };
    });
    return App.Sidebar.Controller;
});