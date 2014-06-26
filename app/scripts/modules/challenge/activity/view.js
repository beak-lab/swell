'use strict';
define(['app', 'templates', 'dust', 'jquery-ui/sortable', 'jquery-ui/droppable', 'jquery-ui/draggable'], function(App) {
    App.module('Challenge.Activity.View', function(View, App, Backbone, Marionette, $) { // , $, _
        View.Layout = Marionette.Layout.extend({
            template: 'activity_show_layout',

            regions: {
                activityRegion: '#activity-region'
            },

        });

        View.Activity = Marionette.ItemView.extend({
            triggers: {
                'click .next': 'next',
                'click .prev': 'prev'
            },

            serializeData: function() {
                var data = this.model.toJSON();
                data.next = this.options.next;
                data.prev = this.options.prev;
                return data;
            },
        });

        View.Launcher = Marionette.ItemView.extend({
            template: 'launch',

            events: {
                'click #activity-launcher': 'launched'
            },

            launched: function() {
                this.trigger('launched');
                // also smoke the top part
                $('#challenge-description').hide();
                $('#challenge-description-expander').hide();
            },
        });

        View.Empty = Marionette.ItemView.extend({
            template: 'empty',
        });

        View.Draggable = View.Activity.extend({
            template: 'draggable',

            onRender: function() {
                this.$el.find('#draggable-container .draggable__item').draggable();
                this.$el.find('#droppable').droppable({
                    activeClass: 'ui-state-default',
                    hoverClass: 'ui-state-hover',
                    drop: function(event, ui) {
                        $('<div/>').addClass('draggable__item is-dropped').text(ui.draggable.text()).appendTo(this);
                        ui.draggable.remove();
                    }
                });
            }
        });

        View.Sortable = View.Activity.extend({
            template: 'sortable',

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

        View.Slideable = View.Activity.extend({
            template: 'slideable',

            // onRender: function() {
            // }
        });

        View.Voteable = View.Activity.extend({
            template: 'voteable',

            onRender: function() {
                this.$el.find('#voteable-container .voteable__item').draggable();
                this.$el.find('#top-droppable, #bottom-droppable').droppable({
                    activeClass: 'ui-state-default',
                    hoverClass: 'ui-state-hover',
                    drop: function(event, ui) {
                        console.log(ui);
                        $('<div/>').addClass('voteable__item is-dropped').text(ui.draggable.text()).appendTo(this);
                        ui.draggable.remove();
                        console.log($('voteable__item').first());
                    }
                });
            }

        });

        View.Radioable = View.Activity.extend({
            template: 'radioable',
        });

        View.Checkboxable = View.Activity.extend({
            template: 'checkboxable',
        });
    });

    return App.Challenge.Activity.View;
});