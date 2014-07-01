'use strict';
/*global window*/
define(['app', 'challenge_show_view', 'challenge_activity_view', 'challenge_entity', 'activity_entity', 'resource_entity'], function(App, View, ActivityView) {
    App.module('Challenge.Show', function (Show, App, Backbone, Marionette, $, _) {
        Show.Controller = {
            show: function(id) {
                var fetchingChallenge = App.request('challenge:entity', id);
                Show.Controller.challengeId = id;
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
                        this.$el.fadeIn('fast');
                    };
                    Show.Controller.layout.pageRegion = new PageRegion();
                    App.mainRegion.show(Show.Controller.layout);
                    // ---- End awesome slider region ----

                    // make the custom menu for this challenge
                    Show.Controller.menu = new View.ChallengeMenu();
                    Show.Controller.layout.menuRegion.show(Show.Controller.menu);

                    // NOTE: without a model, you do not need itemview on the watch string
                   Show.Controller.menu.on('menu:clicked', function(item) {
                        if ('activities' === item) {
                            // make a new view
                            Show.Controller.showActivity();
                        } else {
                            // show the view selected by the menu, take it from cache
                            Show.Controller.layout.pageRegion.show(Show.Controller.showViews[item]);
                        }
                    });

                    // set back button
                    App.execute('set:back', {
                        route: 'domain/' + challenge.get('domain') + '/challenges',
                        page: 'Challenges'
                    });

                    // make a list of all the views, so the menu can cycle through them nicely
                    Show.Controller.showViews = [];

                    // get all the activities related to this challenge
                    $.when(App.request('activity:entities', challenge.get('activities'))).done(function(activities) {
                        // keep track of which one is current, so we can use: next + prev
                        Show.Controller.currentActivity = 0; // index
                        Show.Controller.activityModels = activities; // attach to controller so we can use in function
                        Show.Controller.launched = false;
                        Show.Controller.showActivity(); // show the first activity
                    });

                    // prepare resources
                    $.when(App.request('resource:entities', challenge.get('resources'))).done(function(resources) {
                        Show.Controller.showViews.resources = new View.Resources({
                            resources: resources
                        });
                    });

                    Show.Controller.myStuff();
                });

            },

            /**
            * Note: This is all contextual to this challange
            *
            * Goals
            * Activity outcomes
            */
            myStuff: function() {
                Show.Controller.showViews.stuff = new View.Stuff();
                Show.Controller.myStuffSetup();
            },

            myStuffSetup: function() {
                // get all the saved data for the users goals
                var goals = JSON.parse(window.localStorage.getItem('goals[' + Show.Controller.challengeId + ']'));
                Show.Controller.showViews.stuff.options.goals = goals;

                // the challenge array stores a list of all activity results
                var data = JSON.parse(window.localStorage.getItem('challenge[' + Show.Controller.challengeId + ']'));
                // make a list of the activities the user has done: (aka the keys set)
                var activitiesDone = _.pluck(data, 'id');
                // the users processed data
                var processedActivities = [];
                // get all the activities data (so we can access questions etc)
                $.when(App.request('activity:entities', activitiesDone)).done(function(activities) {
                    // console.log(activities);
                    // each activity
                    _.each(activities, function(activity) {
                        // var activityData = activity.get('data');
                        var realData = activity.get('data');

                        // process activity
                        switch (activity.get('type')) {
                            case 'Checkboxable' :
                                processedActivities.push({
                                    title: activity.get('title'),
                                    data: data[activity.id]
                                });
                            break;
                            case 'Draggable' :
                                // var d = data[activity.id].data.draggable;
                                // console.log(realData);
                                // console.log(d);

                                processedActivities.push({
                                    title: activity.get('title'),
                                    data: data[activity.id].data.draggable
                                });
                            break;
                        }
                    });
                    // var activityData = activity.get('data');
                    // for (var i = 0; i < _.size(data[key]); i++) {
                    //     if (data[key][i]) {
                    //         goals.push({name: activityData[i].goalText});
                    //     }
                    // }
                });
                // console.log(processedActivities);

                Show.Controller.showViews.stuff.options.activities = processedActivities;


            },

            /**
            * Show an activity
            *
            * Decide which one is current, and show that.
            */
            showActivity: function() {
                if (!Show.Controller.launched) {
                    var launcher = new ActivityView.Launcher();
                    launcher.on('launched', function() {
                        Show.Controller.launched = true;
                        Show.Controller.showActivity();
                    });
                    // show the loading page first
                    Show.Controller.layout.pageRegion.show(launcher);
                    return true;
                }

                // if there are no activities for this challange, then show the empty page
                if (Show.Controller.activityModels.length === 0) {
                    Show.Controller.layout.pageRegion.show(new ActivityView.Empty());
                }

                // get the current activity
                var activity = Show.Controller.activityModels[Show.Controller.currentActivity];

                // setup its view
                var view = new ActivityView[activity.get('type')]({
                    model: activity,
                    next: Show.Controller.currentActivity < (Show.Controller.activityModels.length - 1),
                    prev: Show.Controller.currentActivity !== 0,
                    total: Show.Controller.activityModels.length,
                    current: Show.Controller.currentActivity
                });

                // watch the next and prev buttons
                view.on('next', function() {
                    // this should always success, but just incase:
                    if (Show.Controller.currentActivity < (Show.Controller.activityModels.length - 1)) {
                        Show.Controller.currentActivity++;
                        Show.Controller.showActivity();
                    }
                });

                view.on('prev', function() {
                    if (Show.Controller.currentActivity !== 0) {
                        Show.Controller.currentActivity--;
                        Show.Controller.showActivity();
                    }
                });

                view.on('goals', function() {
                    // show the goals setting screen
                    require(['goal_create_controller'], function() {
                        var view = App.request('goal:create');
                        Show.Controller.layout.pageRegion.show(view);

                        view.on('goals:next', function() {
                            // get the new goals first
                            Show.Controller.myStuffSetup();
                            Show.Controller.menu.trigger('menu:clicked', 'stuff');
                        });
                    });
                });

                view.on('save:result', function(data) {
                    console.log('Saving');
                    // get the current data:
                    var thisChallengeData = JSON.parse(window.localStorage.getItem('challenge[' + Show.Controller.challengeId + ']'));
                    if (!thisChallengeData) { // firs time, setup this challenges object
                        thisChallengeData = {};
                    }
                    // update this activity
                    thisChallengeData[activity.id] = {
                        id: activity.id,
                        data: data
                    };
                    // save the result in localstorage
                    window.localStorage.setItem('challenge[' + Show.Controller.challengeId + ']', JSON.stringify(thisChallengeData));
                });

                Show.Controller.layout.pageRegion.show(view);
            },

        };
    });
    return App.Challenge.Show.Controller;
});