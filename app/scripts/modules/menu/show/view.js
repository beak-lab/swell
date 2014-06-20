'use strict';
define(['app', 'templates', 'dust'], function(App) {
    App.module('Menu.View', function(View, App, Backbone, Marionette) { // , $, _
        var contextName = 'Menu.View';

        View.Layout = Marionette.Layout.extend({
            template: 'menu_layout',
            className: 'glb-menu',
            regions: {
                nav: '#glb-nav',
            },

            // events: {
                // 'click .show': 'sidebarExpanderClicked',
            // },

            // sidebarExpanderClicked: function(e) {
                // $([this.$el, e.currentTarget]).toggleClass('is-expanded');
                // $('body').toggleClass('has-expanded-sidebar');
            // },
        });

        View.Menu = Marionette.ItemView.extend({
            tagName: 'li',
            template: 'menu_item',

            events: {
                'click .menu': 'navigate',
            },

            navigate: function(e) {
                e.preventDefault();
                this.trigger('navigate', this.model);
            },

            onRender: function() {
                if(this.model.selected) {
                    this.$el.find('div').addClass('is-active');
                }
            }

        });

        View.Menus = Marionette.CompositeView.extend({
            tagName: 'div',
            className: 'menu',
            template: 'menu_show',
            itemView: View.Menu,
            itemViewContainer: '#menuList',
        });

    });

    return App.Menu.View;
});