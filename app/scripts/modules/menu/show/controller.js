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
                    App.trigger(model.get('trigger'));
                });

                layout.regionManager.get('nav').show(menu);
            },
            setActivePage: function(page) {
                var pageLinks = Show.Controller.menu.collection;
                var linkToSelect = pageLinks.find(function(link) {
                    return link.get('slug') === page;
                });

                // manually do this: since i can't figure it out for now
                // if(Show.Controller.menu.s) { // disabled the selected menu
                //     Show.Controller.menu.s.deselect();
                // }

                Show.Controller.menu.s = linkToSelect; // save the selected menu
                linkToSelect.select();

                pageLinks.trigger('reset');
            },

        };
    });
    return App.Menu.Show.Controller;
});