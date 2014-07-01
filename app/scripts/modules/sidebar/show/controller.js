'use strict';
define(['app', 'sidebar_view', 'sidebar_entity'], function(App, View) {
    App.module('Sidebar', function (Sidebar, App) { // , _, Backbone, Marionette
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

                App.rightRegion.show(new View.Right());

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