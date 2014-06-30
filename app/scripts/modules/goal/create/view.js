'use strict';
define(['app', 'templates', 'dust'], function(App) {
    App.module('Goal.Create.View', function(View, App, Backbone, Marionette, $) { // , $, _

        View.GoalAdd = Marionette.ItemView.extend({
            template: 'goal_create',

            events: {
                // 'click #add_goal': 'added',
                'click .auto_goal': 'addGoal',
                'keyup #goal_name': 'addGoalform'
            },

            appendGoal: function(content){
                var newgoal = $('<div class="activity__personal-goals__goal">' + content + '</div>');
                newgoal.hide();
                this.$el.find('#goals').addClass('has-goals').prepend(newgoal);
                newgoal.slideDown();
            },

            addGoalform: function(e){
                e.preventDefault();
                if(e.keyCode === 13 ){
                    this.appendGoal( this.$el.find('#goal_name').val() );
                    this.$el.find('input').val('');
                }
            },

            addGoal: function(click) {
                this.appendGoal( click.target.innerText );
                $(click.target).slideUp();
                //.slideUp();
            },

/*            added: function(e) {
                console.log(e);
                this.$el.find('#goals')
                    .append('<div class="activity__personal-goals__goal">' + this.$el.find('#goal_name').val() + '</div>')
                    .hide()
                    .slideDown();
                this.$el.find('form')[0].reset();
            },*/

            serializeData: function() {
                var data = {};
                data.autoGoals = this.options.autoGoals;
                return data;
            },
        });

    });

    return App.Goal.Create.View;
});