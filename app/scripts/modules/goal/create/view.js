'use strict';
define(['app', 'templates', 'dust'], function(App) {
    App.module('Goal.Create.View', function(View, App, Backbone, Marionette, $) { // , $, _

        View.GoalAdd = Marionette.ItemView.extend({
            template: 'goal_create',

            events: {
                'click #add_goal': 'added'
            },

            added: function(e) {
                console.log(this.$el);
                this.$el.find('form').reset();
            },

        });

    });



    return App.Goal.Create.View;
});