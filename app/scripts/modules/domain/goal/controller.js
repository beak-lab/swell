'use strict';
/*global window*/
define(['app', 'domain_goal_view', 'domain_entity', 'challenge_entity'], function(App, View) {
    App.module('Domain.Goal', function (Goal, App, Backbone, Marionette, $, _) {
        Goal.Controller = {
            show: function(model) {
                var modelId = (typeof model === 'string') ? model : model.id;
                var fetchingDomains = App.request('domain:entity', modelId);
                $.when(fetchingDomains).done(function(domain) {
                    var fetchingChallenges = App.request('challenge:domain:entities', domain.get('id'));

                    $.when(fetchingChallenges).done(function(challenges) {
                        var thisDomainsChallenges = challenges.where({
                            domain: domain.get('id')
                        });

                        var goals = [];
                        _.each(thisDomainsChallenges, function(challenge) {
                            var c = JSON.parse(window.localStorage.getItem('goals[' + challenge.id + ']'));
                            // if this challenge has been done and if goals added
                            if (c && c.goal) {
                                // add all goals from this challenge
                                var goalset = {};
                                goalset.name = challenge.get('name');
                                goalset.goals = ( _.values(c.goal) );
                                
                                goals.push(goalset);

                                // goals = _.union(goals, _.values(c.goal));
                            }
                        });

                        console.log(goals);

                        App.execute('set:back', {
                            route: false,
                            page: 'Back'
                        });

                        var view = new View.Goals({
                            goals: goals,
                            domain: domain.get('name')
                        });

                        App.mainRegion.show(view);
                        // layout.mainRegion.show(view);
                    });
                });
            }
        };
    });
    return App.Domain.Goal.Controller;
});