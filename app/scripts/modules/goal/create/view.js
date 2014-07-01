'use strict';
define(['app', 'templates', 'dust', 'backbone.syphon'], function(App) {
    App.module('Goal.Create.View', function(View, App, Backbone, Marionette, $) { // , $, _

        View.GoalAdd = Marionette.ItemView.extend({
            template: 'goal_create',

            events: {
                // 'click #add_goal': 'added',
                'click .auto_goal': 'addGoal',
                'keyup #goal_name': 'addGoalform',
                'click #show_summary': 'next'
            },

            appendGoal: function(text) {
                var total = this.$el.find('.activity__personal-goals__goal').length;
                var newgoalInput = $('<input type="hidden" name="goal[' + total + ']" value="' + text + '"/>');
                var newgoalDiv = $('<div class="activity__personal-goals__goal">' + text + '</div>');
                newgoalDiv.hide();
                this.$el.find('#goals').addClass('has-goals').prepend(newgoalDiv);
                this.$el.find('#goals').prepend(newgoalInput);
                newgoalDiv.slideDown();
            },

            addGoalform: function(e) {
                e.preventDefault();
                if (e.keyCode === 13) {
                    var input = this.$el.find('#goal_name');
                    this.appendGoal(input.val());
                    input.val('');
                }
            },

            addGoal: function(click) {
                this.appendGoal(click.target.innerText);
                $(click.target).slideUp();
                //.slideUp();
            },

            next: function() {
                // TODO: remove this SUPEr hack
                $('#challenge_menu .challenge__menu__item').removeClass('is-active');
                $('#stuff').addClass('is-active');

                this.trigger('goals:save', Backbone.Syphon.serialize(this));
                this.trigger('goals:next');
            },

            serializeData: function() {
                var data = {};
                data.autoGoals = this.options.autoGoals;
                return data;
            },
        });

    });

    return App.Goal.Create.View;
});