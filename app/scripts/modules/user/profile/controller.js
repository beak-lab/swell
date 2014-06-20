'use strict';
define(['app', 'user_view'], function(App, View) {
    App.module('User.Profile', function (Profile, App, Backbone, Marionette, $) { // , _
        var contextName = 'User.Profile.Controller';
        Profile.Controller = {
            show: function() {
                require(['common_views', 'user_entity'], function(CommonViews) {
                    App.log('User profile requested', contextName, 2);
                    App.mainRegion.show(new CommonViews.Loading());

                    var fetchingUser = App.request('user:entities');

                    var layout = new View.Layout();

                    $.when(fetchingUser).done(function(user) {

                        var view = new View.User({
                            model: user
                        });

                        // when the data is here, show it in this region
                        layout.userRegion.show(view);

                    });

                    // show the whole layout
                    App.mainRegion.show(layout);
                });

            }
        };
    });
    return App.User.Profile.Controller;
});