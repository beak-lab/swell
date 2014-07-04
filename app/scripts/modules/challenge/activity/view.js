'use strict';
/*global prompt*/
define(['app', 'templates', 'dust', 'backbone.syphon', 'jquery-ui/sortable', 'jquery-ui/droppable', 'jquery-ui/draggable'], function(App) {
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
                    'mousedown .activity__pagination-next': 'nextPressed',
                    'mouseup   .activity__pagination-next': 'nextUnpressed',
                    'click .activity__pagination-goals': 'goals'
                }, this._events, this.events);
                this.clickTime = false;
                Marionette.ItemView.prototype.constructor.apply(this, arguments);
            },

            triggers: {
            },

            nextPressed: function(e) {
                e.preventDefault();
                // if there is an uncleared click event
                if (this.clickTime) {
                    // send backwards
                    this.trigger('prev');
                    this.clickTime = false;
                    return;
                }

                // console.log('Click DOWN');
                this.$el.find('.activity__pagination-next').addClass('is-pressed');
                this.clickTime = new Date().getTime();

            },

            nextUnpressed: function(e) {
                e.preventDefault();
                // console.log('Click UP');
                this.saveData();
                this.$el.find('.activity__pagination-next').removeClass('is-pressed');
                if ((new Date().getTime() - this.clickTime) > 800) {
                    this.trigger('prev');
                } else {
                    this.trigger('next');
                }
                // clear flag
                this.clickTime = false;
            },

            goals: function() {
                // this.saveData();
                this.trigger('goals');
            },

            saveData: function() {
                if (this.template !== 'staticable') {
                    this.trigger('save:result', Backbone.Syphon.serialize(this));
                }
            },

            serializeData: function() {
                var data = this.model.toJSON();
                data.next = this.options.next;
                data.prev = this.options.prev;
                data.total = this.options.total;
                data.current = this.options.current;
                return data;
            },

            onRender: function() {
                $('body').scrollTop(0);
            }
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

            events: {
                'click .addNew': 'onAddNewMagnet'
            },

            onAddNewMagnet: function() {
                var name = prompt('Enter something:');
                if (name) {
                    // make and add a new magnet
                    this.$el.find('#draggable-container').prepend('<div class="draggable__item is-added" >' + name +' </div>');
                    // find that magnet, and make it draggable
                    var item = this.$el.find('#draggable-container div.draggable__item').first();
                    this.makeDraggable(item);
                    // make it flash
                    setTimeout(function() {
                        item.removeClass('is-added');
                    }, 1000);
                }
            },

            onRender: function() {
                var self = this;
                // scrolls' up on page load
                View.Activity.prototype.onRender.call(this);
                // make all magnets draggable
                this.makeDraggable(this.$el.find('#draggable-container .draggable__item'));

                // make the main container droppable. so we can drag magnets out
                this.$el.find('#draggable-container').droppable({
                    accept: '.is-dropped',
                    // when dropped back to the bottom
                    drop: function(event, ui) {
                        var newDopped = $('<div class="draggable__item is-added" >' + ui.draggable.text() + '</div>');
                        newDopped.appendTo(this);

                        self.makeDraggable(newDopped);

                        // also remove any input if there is one in the correct box
                        $('input[value="' + ui.draggable.text() + '"]').remove();
                        ui.draggable.remove();
                    }
                });

                this.$el.find('#droppable').droppable({
                    activeClass: 'ui-state-default',
                    hoverClass: 'ui-state-hover',
                    // when dropped at the top
                    drop: function(event, ui) {
                        var newDopped = $('<div class="draggable__item is-added is-dropped" >' + ui.draggable.text() + '</div>');
                        newDopped.appendTo(this);

                        self.makeDraggable(newDopped);

                        var l = self.$el.find('#draggable-container .draggable__item').length + 1;
                        $('<input type="hidden" name="draggable[' + l + ']" value="' + ui.draggable.text() + '" />').appendTo(this);
                        ui.draggable.remove();
                    }
                });
            },

            makeDraggable: function(el) {
                el.draggable({
                    containment: '#draggableContainmentDiv'
                });
            },
        });

        View.Sortable = View.Activity.extend({
            template: 'sortable',

            // serializeData: function() {
            //     var data = this.model.toJSON();
            //     data.challenge = this.options.challenge;
            //     return data;
            // },

            onRender: function() {
                View.Activity.prototype.onRender.call(this);
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

            events: {
                'click .add_button': 'onAddNewMagnet'
            },

            onAddNewMagnet: function() {
                var name = prompt('Name?');
                if (name) {
                    var container = this.$el.find('#voteable-container').prepend('<div class="voteable__item is-added" >' + name +' </div>'),
                        item = container.children().first().draggable({
                            axis: 'y',
                            containment: '#voteableForm'
                        });

                    setTimeout(function() {
                        item.removeClass('is-added');
                    }, 1000);
                }
            },

            onRender: function() {
                View.Activity.prototype.onRender.call(this);
                this.$el.find('#voteable-container .voteable__item').draggable({
                    axis: 'y',
                    containment: '#voteableForm'
                });
                var self = this;
                this.$el.find('#top-droppable, #bottom-droppable').droppable({
                    activeClass: 'ui-state-default',
                    hoverClass: 'ui-state-hover',
                    drop: function(event, ui) {
                        if (event.target.id === 'bottom-droppable') {
                            // add the hidden form field
                            var l = self.$el.find('#bottom-droppable .voteable__item').length;
                            $('<input type="hidden" name="cons[' + l + ']" value="' + ui.draggable.text() + '" />').appendTo(this);
                            $('<div/>').addClass('voteable__item is-dropped').text(ui.draggable.text()).appendTo(this);
                        } else {
                            // add the hidden form field
                            var le = self.$el.find('#top-droppable .voteable__item').length;
                            $('<input type="hidden" name="pros[' + le + ']" value="' + ui.draggable.text() + '" />').appendTo(this);
                            $('<div/>').addClass('voteable__item is-dropped').text(ui.draggable.text()).appendTo(this);
                        }
                        // remove the dragged item
                        ui.draggable.remove();
                        // check to see if there are any left
                        var selectContainer = $('#voteable-container .voteable__item');
                        if (selectContainer.length === 0) {
                            $('<div class="voteable__item add_button">+Add another</div>').appendTo($('#voteable-container'));
                        }
                    }
                });

            }

        });

        View.Radioable = View.Activity.extend({
            template: 'radioable',

            events: {
                'click .radioable__radiobutton': 'radioClicked'
            },

            radioClicked: function() {
                var radioable = this.$el.find('.radioable');
                var checked = radioable.find('.radioable__radiobutton:checked');
                radioable.find('.radioable__optionset').removeClass('is-active');
                checked.closest('.radioable__optionset').addClass('is-active');
            }
        });

        View.Checkboxable = View.Activity.extend({
            template: 'checkboxable',

            events: {
                'click .checkboxable__checkbox': 'boxChecked'
            },

            boxChecked: function() {
                var checkboxable = this.$el.find('.checkboxable');
                var checked = checkboxable.find('.checkboxable__checkbox:checked');
                checkboxable.find('.checkboxable__optionset').removeClass('is-active');
                checked.closest('.checkboxable__optionset').addClass('is-active');
            },
        });
        View.Staticable = View.Activity.extend({
            template: 'staticable',
        });
    });

    return App.Challenge.Activity.View;
});