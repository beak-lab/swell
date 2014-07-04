'use strict';
define(['app', 'templates', 'dust', 'dustIterate', 'jquery.velocity'], function(App) {
    App.module('Domain.Show.View', function(View, App, Backbone, Marionette, $) {
        View.Layout = Marionette.Layout.extend({
            template: 'domain_goal_show',

            regions: {
                mainRegion: '#domain_goals',
            },

        });

        View.Goals = Marionette.ItemView.extend({
            template: 'domain_goals',

            events: {
                'keyup #goal_name': 'addGoalform',
                'click #personal-goal-add-form': 'addGoalform',
            },

            onDestroy: function() {
                // custom destroying and cleanup goes here
                $('body').addClass('destroyed');
            },

            appendGoal: function(text) {

                var newgoalDiv = $('<label class="mystuff__goals__goal"><input class="mystuff__goals__goal-checkbox checkboxable__checkbox" type="checkbox" /><div class="activity-goal__text">' + text + '</div></label>');
                //newgoalDiv.hide();
                newgoalDiv.css({
                    'height': 0,
                    'min-height': 0
                });

                // this.$el.find('.activity__personal-goals').addClass('has-goals').prepend(newgoalDiv);
                this.$el.find('#goals').append(newgoalDiv);
                newgoalDiv.velocity({
                    'min-height': '5rem'
                }, 500).promise().done(function() {
                    newgoalDiv.css({
                        'height': '',
                        'min-height': ''
                    });
                });
                //newgoalDiv.slideDown();
            },

            addGoalform: function(e) {

                e.preventDefault();
                if (e.keyCode === 13 || $(e.target).hasClass('activity-goal__icon')) {
                    var input = this.$el.find('#goal_name');
                    console.log(input);
                    if (input.val().trim()) {
                        this.appendGoal(input.val());
                        input.val('');
                    }
                }
            },

            serializeData: function() {
                return {
                    goals: this.options.goals,
                    domain: this.options.domain
                };
            },
        });
    });

    return App.Domain.Show.View;
});