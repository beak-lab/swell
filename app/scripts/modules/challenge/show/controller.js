'use strict';
define(['app', 'challenge_show_view', 'challenge_entity'], function(App, View) {
    App.module('Challenge.Show', function (Show, App, Backbone, Marionette, $) { // , _
        Show.Controller = {
            show: function(id) {
                var layout = new View.Layout();
                App.mainRegion.show(layout);

                var menu = new View.ChallengeMenu({

                });
                layout.menuRegion.show(menu);

                // NOTE: without a model, you do not need itemview
                menu.on('menu:clicked', function(item) {
                    layout.pageRegion.show(showViews[item]);
                });

                var fetchingChallenge = App.request('challenge:entity', id);

                var showViews = [];

                $.when(fetchingChallenge).done(function(challenge) {

                    showViews.activities = new View.Activities({
                    });

                    showViews.resources = new View.Resources({
                    });

                    showViews.stuff = new View.Stuff({
                    });

                    layout.pageRegion.show(showViews.activities);

                });

            }
        };
    });
    return App.Challenge.Show.Controller;
});