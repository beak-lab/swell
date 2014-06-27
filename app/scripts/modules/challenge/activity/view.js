'use strict';
define(['app', 'templates', 'dust', 'jquery-ui/sortable', 'jquery-ui/droppable', 'jquery-ui/draggable'], function(App) {
    App.module('Challenge.Activity.View', function(View, App, Backbone, Marionette, $, _) {
        View.Layout = Marionette.Layout.extend({
            template: 'activity_show_layout',

            regions: {
                activityRegion: '#activity-region'
            },

        });

        View.Activity = Marionette.ItemView.extend({
            constructor: function() {
                this.events = _.extend({
                    'mousedown .next': 'nextPressed',
                    'mouseup   .next': 'nextUnpressed',
                }, this._events, this.events);
                Marionette.ItemView.prototype.constructor.apply(this, arguments);
            },

            triggers: {
                'click .goals': 'goals'
            },

            nextPressed: function(e) {
                e.preventDefault();
                console.log('Click DOWN');
                this.$el.find('.next').addClass('is-pressed');
                this.clickTime = new Date().getTime();
            },

            nextUnpressed: function(e) {
                e.preventDefault();
                console.log('Click UP');
                this.$el.find('.next').removeClass('is-pressed');
                if (new Date().getTime() - this.clickTime > 800) {
                    this.trigger('prev');

                } else {
                    this.trigger('next');
                }
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
                // $('#challenge-description').hide();
                // $('#challenge-description-expander').hide();
                $('.challenge').addClass('is-compacted');
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
                        if (event.target.id === 'bottom-droppable') {
                            $('<div/>').addClass('voteable__item is-dropped').text(ui.draggable.text()).appendTo(this);
                        } else {
                            $('<div/>').addClass('voteable__item is-dropped').text(ui.draggable.text()).appendTo(this);
                        }
                        ui.draggable.remove();

                        if ($('.voteable__item')) {
                            $('.voteable__item').first().show();
                        } else {
                            console.log('Show all done..');
                        }
                    }
                });

            }

        });

        View.Radioable = View.Activity.extend({
            template: 'radioable',

            events: {
                'click .radioable__radiobutton': 'somethingChanged'
            },

            somethingChanged: function() {
                console.log('fired');
                var radioable = this.$el.find('.radioable');
                var checked = radioable.find('.radioable__radiobutton:checked');
                radioable.find('.radioable__optionset').removeClass('is-active');
                checked.closest('.radioable__optionset').addClass('is-active');
            }
        });

        View.Checkboxable = View.Activity.extend({
            template: 'checkboxable',

            events: {
                'click .checkboxable__checkbox': 'somethingChanged'
            },

            somethingChanged: function() {
                var checkboxable = this.$el.find('.checkboxable');
                var checked = checkboxable.find('.checkboxable__checkbox:checked');
                checkboxable.find('.checkboxable__optionset').removeClass('is-active');
                checked.closest('.checkboxable__optionset').addClass('is-active');
            },
        });
    });

    return App.Challenge.Activity.View;
});