'use strict';
define(['app', 'templates', 'dust', 'jquery-ui/sortable', 'jquery-ui/droppable', 'jquery-ui/slider'], function(App) {
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

            defaults: {
                description: '',
                question: ''
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

            defaults: {
                label: 'Default Label',
                description: 'Default desc',
                question: 'Default question'
            },

            onRender: function() {
                this.$el.find('#slider').slider({
                    value: 100,
                    min: 0,
                    max: 500,
                    step: 50,
                    slide: function(event, ui) {
                        this.$el.find('#value').val('$' + ui.value);
                    }
                });
                this.$el.find('#value').val('$' + $('#slider').slider('value'));
            }
        });
        View.Voteable = Marionette.ItemView.extend({
            template: 'voteable',

            onRender: function() {
            }
        });
    });

    return App.Challenge.Activity.View;
});