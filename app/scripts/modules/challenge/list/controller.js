'use strict';
define(['app', 'challenge_list_view', 'challenge_entity'], function(App, View) {
    App.module('Challenge.List', function (List, App, Backbone, Marionette, $) { // , _
        var contextName = 'Challenge.List.Controller';
        List.Controller = {
            list: function(domainId) {
                require(['common_views'], function(CommonViews) {
                    App.log('List Challenge called', contextName, 2);
                    App.mainRegion.show(new CommonViews.Loading());

                    var layout = new View.Layout();

                    // ---- Make awesome slider region: ----
                    var PageRegion = Backbone.Marionette.Region.extend({
                        el: '#challenge-region',
                    });
                    PageRegion.prototype.open = function(view) {
                        this.$el.hide();
                        this.$el.html(view.el);
                        this.$el.slideDown('fast');
                    };
                    layout.challengeRegion = new PageRegion();
                    App.mainRegion.show(layout);
                    // ---- End awesome slider region ----

                    // if a domain is passed in
                    var fetchingChallenges = domainId ?
                        // then only list challenges from that domain
                        App.request('challenge:domain:entities', domainId) :
                        // else list all challenges
                        App.request('challenge:entities');

                    $.when(fetchingChallenges).done(function(challenges) {
                        App.execute('set:back', {
                            route: 'domains',
                            // route: 'domain/' + domainId + '/challenges',
                            page: 'Domains'
                        });

                        var view = new View.Challenge({
                            collection: challenges
                        });

                        view.on('itemview:challenge:show', function(childView, model) {
                            App.trigger('challenge:show', model.get('id'));
                        });

                        // when the data is here, show it in this region
                        // layout.regionManager.get('challengeRegion').show(view);
                        layout.challengeRegion.show(view);
                    });

                    // show the whole layout
                });

            },

            // byDomain: function(domain) {
            //     var layout = new View.Layout();
            //     App.mainRegion.show(layout);

            //     var fetchingChallenges = App.request('challenge:domain:entities', domain);

            //     $.when(fetchingChallenges).done(function(challenges) {
            //         var view = new View.Challenge({
            //             collection: challenges
            //         });

            //         view.on('itemview:challenge:show', function(childView, model) {
            //             App.trigger('challenge:show', model.get('id'));
            //         });

            //         layout.challengeRegion.show(view);

            //     });

            // }
        };
    });
    return App.Challenge.List.Controller;
});