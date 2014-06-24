'use strict';
define(['app', 'challenge_show_view', 'challenge_entity', 'activity_entity'], function(App, View) {
    App.module('Challenge.Show', function (Show, App, Backbone, Marionette, $) { // , _
        Show.Controller = {
            show: function(id) {
                var layout = new View.Layout();

                // ---- Make awesome slider region: ----
                var PageRegion = Backbone.Marionette.Region.extend({
                    el: '#show_page',
                });
                PageRegion.prototype.open = function(view) {
                    this.$el.hide();
                    this.$el.html(view.el);
                    this.$el.slideDown('slow');
                };
                layout.pageRegion = new PageRegion();
                App.mainRegion.show(layout);
                // ---- End awesome slider region ----

                // make the custom menu for this challenge
                var menu = new View.ChallengeMenu({

                });
                layout.menuRegion.show(menu);

                // NOTE: without a model, you do not need itemview on the watch string
                menu.on('menu:clicked', function(item) {
                    // show the view selected by the menu
                    layout.pageRegion.show(showViews[item]);
                });

                var fetchingChallenge = App.request('challenge:entity', id);

                // make a list of all the views
                var showViews = [];

                $.when(fetchingChallenge).done(function(challenge) {

                    // set back button
                    App.execute('set:back', {
                        route: 'domain/' + challenge.get('domain') + '/challenges',
                        page: 'Challenges'
                    });

                    // var fetchingActivity = App.request('activity:entity', challenge.get('activity'));

                    var fetchingActivity = App.request('challenge:activity', challenge.get('activity'));

                    $.when(fetchingActivity).done(function(activity) {
console.log(activity);
                        // if(id === 1) {
                        //     showViews.activities = new View.Draggable({
                        //         model: challenge
                        //     });
                        // } else {
                        //     showViews.activities = new View.Sortable({
                        //         model: challenge
                        //     });
                        // }

                        showViews.activities = activity;

                        layout.pageRegion.show(showViews.activities);
                    });

                    showViews.resources = new View.Resources({
                        resources: challenge.get('resources')
                    });

                    showViews.stuff = new View.Stuff({
                    });

                });

            }
        };
    });
    return App.Challenge.Show.Controller;
});