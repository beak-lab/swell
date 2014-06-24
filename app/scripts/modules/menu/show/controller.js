'use strict';
define(['app', 'menu_view', 'menu_entity'], function(App, View) {
    App.module('Menu.Show', function (Show, App) { // , _, Backbone, Marionette
        Show.Controller = {
            setup: function() {
                Show.Controller.layout = new View.Layout();
                App.menuRegion.show(Show.Controller.layout);

                Show.Controller.menu = new View.Menus({
                    collection: App.request('menu:entities')
                });

                // Show.Controller.menu.on('itemview:navigate', function(childView, model) {
                //     App.log('Navigating to: ' + model.get('trigger'), contextName, 1);
                //     App.trigger(model.get('trigger'));
                // });

                // Show.Controller.layout.regionManager.get('nav').show(Show.Controller.back);
            },

            setActivePage: function(page) {
                var pageLinks = Show.Controller.menu.collection;
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

            setBackButtonLink: function(data) {
                // var back = Show.Controller.back;
                // Show.Controller.back.options.page = page;
                // console.log(back);

                // Show.Controller.back.trigger('reset');

                Show.Controller.back = new View.Back({
                    page: data.page,
                    route: data.route
                });

                var rm = Show.Controller.layout.regionManager;

                if (undefined === data) {
                    console.log(rm.get('nav'));
                    // if (rm.get('nav')) {
                        rm.get('nav').hide();
                    // }
                } else {
                    rm.get('nav').show(Show.Controller.back);
                }

            },

        };
    });
    return App.Menu.Show.Controller;
});