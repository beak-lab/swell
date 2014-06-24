'use strict';
define(['app', 'challenge_show_view', 'challenge_entity'], function(App, View) {
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
                    this.$el.slideDown('fast');
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
                    layout.pageRegion.show(showViews[item]);
                });

                var fetchingChallenge = App.request('challenge:entity', id);

                var showViews = [];

                $.when(fetchingChallenge).done(function(challenge) {

                    // set back button
                    App.execute('set:back', {
                        route: 'domain/' + challenge.get('domain') + '/challenges',
                        page: 'Challenges'
                    });

                    if(id === 1) {
                        showViews.activities = new View.Draggable({
                            model: challenge
                        });
                    } else {
                        showViews.activities = new View.Sortable({
                            model: challenge
                        });
                    }

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