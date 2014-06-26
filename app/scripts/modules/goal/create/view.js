'use strict';
define(['app', 'templates', 'dust'], function(App) {
    App.module('Goal.Create.View', function(View, App, Backbone, Marionette, $) { // , $, _

        View.GoalAdd = Marionette.ItemView.extend({
            template: 'goal_create',

            events: {
                'click #add_goal': 'added',
                'click .auto_goal': 'addGoal'
            },

            addGoal: function(click) {
                this.$el.find('#goals').append('<div>' + click.target.innerText + '</div>');
                click.target.remove();
            },

            added: function(e) {
                console.log(e);
                this.$el.find('#goals').append('<div>' + this.$el.find('#goal_name').val() + '</div>');
                this.$el.find('form')[0].reset();
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