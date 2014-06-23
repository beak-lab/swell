'use strict';
define(['app', 'templates', 'dust', 'jquery-ui/sortable', 'jquery-ui/droppable', 'backbone.syphon'], function(App) {
    App.module('Challenge.Show.View', function(View, App, Backbone, Marionette, $) { // , $, _
        View.Layout = Marionette.Layout.extend({
            template: 'challenge_show_layout',

            regions: {
                menuRegion: '#show_menu',
                // pageRegion: '#show_page'
            },

            flash: function(cssClass) { // fade in and out.
                var $view = this.$el;
                $view.hide().toggleClass(cssClass).fadeIn(800, function() {
                    setTimeout(function() {
                        $view.toggleClass(cssClass);
                    }, 500);
                });
            }

        });

        View.ChallengeMenu = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'challenge_menu',

            events: {
                'click #challenge_menu li': 'clicked'
            },

            clicked: function(e) {
                e.preventDefault();
                this.trigger('menu:clicked', e.target.id);
            }
        });

        View.Sortable = Marionette.ItemView.extend({
            template: 'sortable',

            onRender: function() {
                this.$el.find('#sortable').sortable();
                this.$el.find('#sortable').disableSelection();
            }
        });

        View.Draggable = Marionette.ItemView.extend({
            template: 'draggable',

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

        View.Resources = Marionette.ItemView.extend({
            template: 'resources',
        });

        View.Stuff = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'stuff',

            events: {
            },

        });


    });

    return App.Challenge.Show.View;
});