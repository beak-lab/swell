'use strict';
define(['app', 'challenge_list_view', 'challenge_entity'], function(App, View) {
    App.module('Challenge.List', function (List, App, Backbone, Marionette, $) { // , _
        var contextName = 'Challenge.List.Controller';
        List.Controller = {
            list: function() {

                require(['common_views'], function(CommonViews) {
                    App.log('List Challenge called', contextName, 2);
                    App.mainRegion.show(new CommonViews.Loading());

                    var fetchingChallenge = App.request('challenge:entities');

                    var challengeListLayout = new View.Layout();
                    // var challengeListPanel = new View.Panel();

                    $.when(fetchingChallenge).done(function(challenge) {
                        // App.log('Fetched challenge data', 'App', 1);

                        var challengeListView = new View.Challenge({
                            collection: challenge
                        });

                        // challengeListLayout.on('show', function() {
                        //   challengeListLayout.panelRegion.show(challengesListPanel);
                        //   challengeListLayout.challengeRegion.show(challengeListView);
                        // });

                        // challengeListView.on('itemview:challenge:show', function(childView, model) {
                        //   App.trigger('challenge:show', model.get('id'));
                        // });

                        challengeListView.on('itemview:challenge:delete', function(childView, model) {
                            // auto magically call's remove in the view.
                            model.destroy();
                        });

                        // when the data is here, show it in this region
                        challengeListLayout.challengeRegion.show(challengeListView);

                    });

                    // show the whole layout
                    App.mainRegion.show(challengeListLayout);
                });

            },

            show: function(slug) {
                console.log('Showing: ' + slug);
            },

            byDomain: function(domain) {
                var layout = new View.Layout();
                App.mainRegion.show(layout);

                var fetchingChallenges = App.request('challenge:domain:entities', domain);

                $.when(fetchingChallenges).done(function(challenges) {

                    var view = new View.Challenge({
                        collection: challenges
                    });

                    layout.challengeRegion.show(view);

                });

            }
        };
    });
    return App.Challenge.List.Controller;
});