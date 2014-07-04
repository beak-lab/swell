'use strict';
define(['app'], function(App) {
    App.module('Sidebar.View', function(View, App, Backbone, Marionette, $) { // , $, _
        View.Layout = Marionette.Layout.extend({
            template: 'sidebar_layout',
            regions: {
                history: '#sidebar-history',
            },

            triggers: {
                'click .sidebar-settings': 'user:settings'
            }
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

        View.GoalItem = Marionette.ItemView.extend({
            template: 'sidebar_goal',

            triggers: {
                'click .sidebar-goals__mygoals__goal': 'goalClicked'
            },

        });

        View.Right = Marionette.CompositeView.extend({
            tagName: 'div',
            className: 'sidebar',
            template: 'sidebar_mystuff',
            itemView: View.GoalItem,
            itemViewContainer: '#sidebar-goals-list',

            events: {
                'change .goals__goal__checkbox': 'goalsCheckbox',
            },

            goalsCheckbox: function(e) {
                if ($(e.target).is(':checked')){
                    var parentgoalset = $(e.target).closest('.goals__goal');
                    parentgoalset.find('.goals__goal__checkbox').each(function(){
                        $(this).prop('checked', true);
                    });
                }
            },
        });

    });

    return App.Sidebar.View;
});