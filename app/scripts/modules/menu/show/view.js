'use strict';
define(['app', 'templates', 'dust'], function(App) {
    App.module('Menu.View', function(View, App, Backbone, Marionette) { // , $, _
        var contextName = 'Menu.Show.View';

        View.Layout = Marionette.Layout.extend({
            template: 'menu_layout',
            className: 'glb-menu',
            regions: {
                nav: '#glb-nav',
            },

            events: {
                // 'click #glb-sidebar-expander': 'sidebarExpanderClicked',
            },

            // sidebarExpanderClicked: function(e) {
                // $([this.$el, e.currentTarget]).toggleClass('is-expanded');
                // $('body').toggleClass('has-expanded-sidebar');
            // },
        });



    });

    return App.Menu.List.View;
});