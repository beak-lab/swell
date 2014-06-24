'use strict';
define(['app', 'challenge_activity_view', 'activity_entity'], function(App, View) {
    App.module('Challenge.Activity', function (Activity, App, Backbone, Marionette, $) { // , _
        var contextName = 'Challenge.Activity.Controller';
        Activity.Controller = {
            get: function(id) {
                var fetchingActivity = App.request('activity:entity', id);
                                console.log('13');

                $.when(fetchingActivity).done(function(activity) {

                    var view = new View.Activity({
                        collection: activity
                    });
                console.log('12');

                    return view;
                });

                console.log('1');
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
    return App.Challenge.Activity.Controller;
});