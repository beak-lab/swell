'use strict';
define(['app', 'user_list_view'], function(App, View) {
    App.module('UserApp.List', function (List, App, Backbone, Marionette, $) { // , _
        var contextName = 'UserApp.List.Controller';
        List.Controller = {
            listUser: function() {
                
                require(['common/views', 'user_entity'], function(CommonViews) {
                    App.log('List User called', contextName, 2);
                    App.mainRegion.show(new CommonViews.Loading());

                    var fetchingUser = App.request('user:entities');

                    var userListLayout = new View.Layout();
                    // var userListPanel = new View.Panel();

                    $.when(fetchingUser).done(function(user) {
                        // App.log('Fetched user data', 'App', 1);

                        var userListView = new View.User({
                            collection: user
                        });

                        // userListLayout.on('show', function() {
                        //   userListLayout.panelRegion.show(usersListPanel);
                        //   userListLayout.userRegion.show(userListView);
                        // });

                        // userListView.on('itemview:user:show', function(childView, model) {
                        //   App.trigger('user:show', model.get('id'));
                        // });

                        userListView.on('itemview:user:delete', function(childView, model) {
                            // auto magically call's remove in the view.
                            model.destroy();
                        });

                        // when the data is here, show it in this region
                        userListLayout.userRegion.show(userListView);

                    });

                    // show the whole layout
                    App.mainRegion.show(userListLayout);
                });
                
            }
        };
    });
    return App.UserApp.List.Controller;
});