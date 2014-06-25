'use strict';
define(['app', 'challenge_show_view', 'challenge_activity_view', 'challenge_entity', 'activity_entity', 'resource_entity'], function(App, View, ActivityView) {
    App.module('Challenge.Show', function (Show, App, Backbone, Marionette, $) { // , _
        Show.Controller = {
            show: function(id) {
                var fetchingChallenge = App.request('challenge:entity', id);
                $.when(fetchingChallenge).done(function(challenge) {

                    Show.Controller.layout = new View.Layout({
                        model: challenge
                    });

                    // ---- Make awesome slider region: ----
                    var PageRegion = Backbone.Marionette.Region.extend({
                        el: '#show_page',
                    });
                    PageRegion.prototype.open = function(view) {
                        this.$el.hide();
                        this.$el.html(view.el);
                        this.$el.slideDown('slow');
                    };
                    Show.Controller.layout.pageRegion = new PageRegion();
                    App.mainRegion.show(Show.Controller.layout);
                    // ---- End awesome slider region ----

                    // make the custom menu for this challenge
                    var menu = new View.ChallengeMenu({

                    });
                    Show.Controller.layout.menuRegion.show(menu);

                    // NOTE: without a model, you do not need itemview on the watch string
                    menu.on('menu:clicked', function(item) {
                        // show the view selected by the menu
                        Show.Controller.layout.pageRegion.show(Show.Controller.showViews[item]);
                    });

                    // set back button
                    App.execute('set:back', {
                        route: 'domain/' + challenge.get('domain') + '/challenges',
                        page: 'Challenges'
                    });

                    // make a list of all the views, so the menu can cycle through them nicely
                    Show.Controller.showViews = [];

                    // NOTE: These call show after being made, so they act as the first selected
                    // when this layout is initially rendered
                    $.when(App.request('activity:entities', challenge.get('activities'))).done(function(activities) {
                        // keep track, so we can use: next + prev
                        Show.Controller.currentActivity = 0; // index
                        Show.Controller.activitytotal = activities.length;

                        if (activities.length === 0) {
                            Show.Controller.showViews.activities = new ActivityView.Empty();
                            Show.Controller.layout.pageRegion.show(Show.Controller.showViews.activities);
                        } else {

                            Show.Controller.showActivity(activities);

                            Show.Controller.showViews.activities.on('next', function() {
                                    console.log(Show.Controller.currentActivity);
                                Show.Controller.currentActivity++;
                                Show.Controller.showActivity(activities);
                            });

                            Show.Controller.showViews.activities.on('prev', function() {
                                    console.log(Show.Controller.currentActivity);
                                if (Show.Controller.currentActivity !== 0) {
                                    Show.Controller.currentActivity--;
                                    Show.Controller.showActivity(activities);
                                }
                            });
                        }


                    });

                    // prepare resources
                    $.when(App.request('resource:entities', challenge.get('resources'))).done(function(resources) {
                        Show.Controller.showViews.resources = new View.Resources({
                            resources: resources
                        });
                    });

                    Show.Controller.showViews.stuff = new View.Stuff({
                    });

                });

            },

            showActivity: function(activities) {
                var activity = activities[Show.Controller.currentActivity];
                Show.Controller.showViews.activities = new ActivityView[activity.get('type')]({
                    model: activity,
                });
                Show.Controller.layout.pageRegion.show(Show.Controller.showViews.activities);
            },

        };
    });
    return App.Challenge.Show.Controller;
});