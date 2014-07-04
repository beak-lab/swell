'use strict';
/*global window*/
define(['app', 'domain_goal_view', 'domain_entity', 'challenge_entity'], function(App, View) {
    App.module('Domain.Goal', function (Goal, App, Backbone, Marionette, $, _) {
        Goal.Controller = {
            show: function(model) {
                var fetchingChallenges;
                var domainId;

                if (typeof model === 'string') {
                    var fetchingDomains = App.request('domain:entity', model);
                    $.when(fetchingDomains).done(function(domain) {
                        domainId = domain.get('id');
                        fetchingChallenges = App.request('challenge:domain:entities', domain.get('id'));
                    });
                } else {
                    domainId = model.id;
                    fetchingChallenges = App.request('challenge:domain:entities', model.id);
                }

                $.when(fetchingChallenges).done(function(challenges) {
                    var thisDomainsChallenges = challenges.where({
                        domain: domainId
                    });

                    var goals = [];
                    _.each(thisDomainsChallenges, function(challenge) {
                        var c = JSON.parse(window.localStorage.getItem('goals[' + challenge.id + ']'));
                        // if this challenge has been done and if goals added
                        if (c && c.goal) {
                            // add all goals from this challenge
                            goals = _.union(goals, _.values(c.goal));
                        }
                    });

                    var view = new View.Goals({
                        goals: goals
                    });

                    App.mainRegion.show(view);
                    // layout.mainRegion.show(view);
                });
            }
        };
    });
    return App.Domain.Goal.Controller;
});