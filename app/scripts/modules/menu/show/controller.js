'use strict';
define(['app', 'menu_view', 'menu_entity'], function(App, View) {
    App.module('Menu.Show', function (Show, App) { // , _, Backbone, Marionette
        var contextName = 'Menu.Show.Controller';
        Show.Controller = {
            setup: function() {
                var layout = new View.Layout();
                App.menuRegion.show(layout);

                Show.Controller.menu = new View.Menus({
                    collection: App.request('menu:entities')
                });

                Show.Controller.menu.on('itemview:navigate', function(childView, model) {
                    App.log('Navigating to: ' + model.get('trigger'), contextName, 1);
                    App.trigger(model.get('trigger'));
                });

                layout.regionManager.get('nav').show(Show.Controller.menu);
            },
            setActivePage: function(page) {
                var pageLinks = Show.Controller.menu.collection;
                console.log(page);
                var linkToSelect = pageLinks.find(function(link) {
                    return link.get('slug') === page;
                });

                // manually do this: since i can't figure it out for now
                if(Show.Controller.menu.s) { // disabled the selected menu
                    Show.Controller.menu.s.deselect();
                }

                Show.Controller.menu.s = linkToSelect; // save the selected menu
                linkToSelect.select();

                pageLinks.trigger('reset');
            },

        };
    });
    return App.Menu.Show.Controller;
});