'use strict';
define(['app'], function(App) {
    App.module('Sidebar.View', function(View, App, Backbone, Marionette) { // , $, _
        View.Layout = Marionette.Layout.extend({
            template: 'sidebar_layout',
            regions: {
                history: '#sidebar-history',
            },
        });

        View.HistoryItem = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'sidebar_history_item',
        });

        View.Left = Marionette.CompositeView.extend({
            tagName: 'div',
            className: 'sidebar',
            template: 'sidebar_history_list',
            itemView: View.HistoryItem,
            itemViewContainer: '#sidebar-history-list',
        });

    });

    return App.Sidebar.View;
});