'use strict';
define(['app', 'templates', 'dust', 'jquery-ui/sortable', 'jquery-ui/droppable', 'jquery-ui/slider'], function(App) {
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
            }
        });

        View.Empty = Marionette.ItemView.extend({
            template: 'empty',
        });

        View.Draggable = View.Activity.extend({
            template: 'draggable',

            onRender: function() {
                this.$el.find('#draggable p').draggable();
                this.$el.find('#droppable').droppable({
                    activeClass: 'ui-state-default',
                    hoverClass: 'ui-state-hover',
                    drop: function(event, ui) {
                        $('<li></li>').text(ui.draggable.text()).appendTo(this);
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

            onRender: function() {
                this.$el.find('#slider').slider({
                    value: 250,
                    min: 0,
                    max: 500,
                    step: 50,
                    // slide: function(event, ui) {
                    //     this.$el.find('#title').val('$' + ui.value);
                    // }
                });
                // this.$el.find('#title').val('$' + $('#slider').slider('value'));
            }
        });

        View.Voteable = View.Activity.extend({
            template: 'voteable',

            triggers: {
                'click .next': 'next',
                'click .prev': 'prev'
            },

            onRender: function() {}
        });
    });

    return App.Challenge.Activity.View;
});