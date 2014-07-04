'use strict';
define(['app', 'templates', 'dust', 'backbone.syphon'], function(App) {
    App.module('Goal.Create.View', function(View, App, Backbone, Marionette, $) { // , $, _

        View.GoalAdd = Marionette.ItemView.extend({
            template: 'goal_create',

            events: {
                // 'click #add_goal': 'added',
                'click .auto_goal': 'addGoal',
                'keyup #goal_name': 'addGoalform',
                'click #personal-goal-add-form' : 'addGoalform',
                'click #show_summary': 'next'
            },

            appendGoal: function(text) {
                var total = this.$el.find('.activity__personal-goals__goal').length;
                var newgoalInput = $('<input type="hidden" name="goal[' + total + ']" value="' + text + '"/>');
                var newgoalDiv = $('<div class="activity__personal-goals__goal"><div class="activity-goal__icon"></div><div class="activity-goal__text">' + text + '</div></div>');
                //newgoalDiv.hide();
                newgoalDiv.css({'height' :  0, 'min-height' : 0});

                this.$el.find('.activity__personal-goals').addClass('has-goals');
                this.$el.find('#goals').addClass('has-goals').prepend(newgoalDiv);
                this.$el.find('#goals').prepend(newgoalInput);
                //newgoalDiv.slideDown();
                newgoalDiv.animate({
                    'min-height' : '5rem'
                }, 500).promise().done(function(){
                    newgoalDiv.css({'height' :  '', 'min-height' : ''});
                });
            },

            addGoalform: function(e) {
                e.preventDefault();

                if (e.keyCode === 13 || $(e.target).hasClass('activity-goal__icon')) {
                    var input = this.$el.find('#goal_name');

                    if( input.val().trim() ) {
                        this.appendGoal(input.val());
                        input.val('');
                    }
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

            onRender: function() {
                $('body').scrollTop(0);
            }
        });

    });

    return App.Goal.Create.View;
});