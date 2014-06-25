'use strict';
define(['app', 'templates', 'dust'], function(App) {
    App.module('Challenge.Activity.View', function(View, App, Backbone, Marionette, $) { // , $, _
        View.Layout = Marionette.Layout.extend({
            template: 'activity_show_layout',

            regions: {
                activityRegion: '#activity-region'
            },

        });

        View.Empty = Marionette.ItemView.extend({
            template: 'empty',
        });

        View.Draggable = Marionette.ItemView.extend({
            tagName: 'div',
            className: '',
            template: 'draggable',
            triggers: {
                'click .next': 'next',
                'click .prev': 'prev'
            },

            onRender: function() {
                this.$el.find('#draggable').draggable();
                this.$el.find('#droppable').droppable({
                    drop: function(event, ui) {
                        $(this)
                            .addClass('ui-state-highlight')
                            .find('p')
                            .html('Dropped!');
                    }
                });
            }
        });

        View.Sortable = Marionette.ItemView.extend({
            tagName: 'div',
            className: '',
            template: 'sortable',
            triggers: {
                'click .next': 'next',
                'click .prev': 'prev'
            },

            // serializeData: function() {
            //     var data = this.model.toJSON();
            //     data.challenge = this.options.challenge;
            //     return data;
            // },

            onRender: function() {
                this.$el.find('#sortable').sortable();
                this.$el.find('#sortable').disableSelection();
            }
        });

        View.Slideable = Marionette.ItemView.extend({
            template: 'slideable',
        });

    });

    return App.Challenge.Activity.View;
});