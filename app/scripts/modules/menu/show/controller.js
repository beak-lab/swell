'use strict';
define(['app', 'menu_view', 'menu_entity'], function(App, View) {
    App.module('Menu.Show', function (Show, App, Backbone, Marionette) { // , _
        var contextName = 'Menu.Show.Controller';
        Show.Controller = {
            setup: function() {
                var layout = new View.Layout();
                App.menuRegion.show(layout);

                var menu = new View.Menus({
                    collection: App.request('menu:entities')
                });

                menu.on('itemview:navigate', function(childView, model) {
                    console.log('Navigate called');
                });

                layout.regionManager.get('nav').show(menu);
            }
        };
    });
    return App.Menu.Show.Controller;
});