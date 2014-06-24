'use strict';
define(['app', 'activity_show_view'], function(App, View) {
    App.module('Activity.Show', function (Show, App, Backbone, Marionette, $) { // , _
        var contextName = 'Activity.Show.Controller';
        Show.Controller = {
            show: function(id) {

                require(['common_views', 'activity_entity'], function(CommonViews) {
                    App.log('Show Activity called', contextName, 2);
                    App.mainRegion.show(new CommonViews.Loading());

                    var fetchingActivity = App.request('activity:entity', id);
                    var activityShowLayout = new View.Layout();

                    $.when(fetchingActivity).done(function(activity) {

                        var activityShowView = new View.Activity({
                            collection: activity
                        });

                        // when the data is here, show it in this region
                        activityShowLayout.activityRegion.show(activityShowView);
                    });

                    // show the whole layout
                    App.mainRegion.show(activityShowLayout);
                });

            }
        };
    });
    return App.Activity.Show.Controller;
});