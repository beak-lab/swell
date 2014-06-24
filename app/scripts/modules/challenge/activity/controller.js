'use strict';
define(['app', 'challenge_activity_view', 'activity_entity'], function(App, View) {
    App.module('Challenge.Activity', function (Activity, App, Backbone, Marionette, $) { // , _
        var contextName = 'Activity.Activity.Controller';
        Activity.Controller = {
            get: function(id) {
                var fetchingActivity = App.request('activity:entity', id);
                $.when(fetchingActivity).done(function(activity) {

                    var view = new View.Activity({
                        collection: activity
                    });

                    return view;
                });
            },
            show: function(id) {

                require(['common_views', 'activity_entity'], function(CommonViews) {
                    App.log('Activity Activity called', contextName, 2);
                    App.mainRegion.show(new CommonViews.Loading());

                    var fetchingActivity = App.request('activity:entity', id);
                    var activityActivityLayout = new View.Layout();

                    $.when(fetchingActivity).done(function(activity) {

                        var activityActivityView = new View.Activity({
                            collection: activity
                        });

                        // when the data is here, show it in this region
                        activityActivityLayout.activityRegion.show(activityActivityView);
                    });

                    // show the whole layout
                    App.mainRegion.show(activityActivityLayout);
                });

            }
        };
    });
    return App.Activity.Activity.Controller;
});