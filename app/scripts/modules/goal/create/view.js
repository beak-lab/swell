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

            next: function() {
                // TODO: remove this SUPEr hack
                $('#challenge_menu .challenge__menu__item').removeClass('is-active');
                $('#stuff').addClass('is-active');

                this.trigger('goals:save', Backbone.Syphon.serialize(this));
                this.trigger('goals:next');
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