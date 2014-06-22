'use strict';
define(['app', 'challenge_show_view', 'challenge_entity'], function(App, View) {
    App.module('Challenge.Show', function (Show, App, Backbone, Marionette, $) { // , _
        Show.Controller = {
            show: function(id) {
                var layout = new View.Layout();
                App.mainRegion.show(layout);

                var fetchingChallenge = App.request('challenge:entity', id);

                $.when(fetchingChallenge).done(function(challenge) {

                    var view = new View.Challenge({
                    });

                    layout.pageRegion.show(view);

                });

            }
        };
    });
    return App.Challenge.Show.Controller;
});