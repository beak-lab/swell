'use strict';
define(['app', 'templates', 'dust'], function(App) {
    App.module('Challenge.List.View', function(View, App, Backbone, Marionette) { // , $, _
        View.Layout = Marionette.Layout.extend({
            template: 'challenge_layout',

            regions: {
                panelRegion: '#panel-region',
                challengeRegion: '#challengeRegion'
            },

            flash: function(cssClass) { // fade in and out.
                var $view = this.$el;
                $view.hide().toggleClass(cssClass).fadeIn(800, function() {
                    setTimeout(function() {
                        $view.toggleClass(cssClass);
                    }, 500);
                });
            }
        });

        View.ChallengeOne = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'challenge_list_one',

            events: {
                'click .challenge': 'showClicked',
            },

            showClicked: function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('challenge:show', this.model);
            },

        });

        var ChallengeEmpty = Marionette.ItemView.extend({
            template: 'challenge_none',
            className: 'alert'
        });

        View.Challenge = Marionette.CompositeView.extend({
            tagName: 'div',
            className: '',
            template: 'challenge_list',
            emptyView: ChallengeEmpty,
            itemView: View.ChallengeOne,
            itemViewContainer: '#challengeList',

            initialize: function() {
                // App.log('init called', contextName, 1);
                this.listenTo(this.collection, 'reset', function() {
                    // App.log('reset called', contextName, 1);
                    this.appendHtml = function(collectionView, itemView) { //, index) {
                        collectionView.$el.append(itemView.el);
                    };
                });
            },

            onCompositeCollectionRendered: function() {
                // App.log('rendered called', contextName, 1);
                this.appendHtml = function(collectionView, itemView) { //, index) {
                    collectionView.$el.prepend(itemView.el);
                };
            }
        });

    });

    return App.Challenge.List.View;
});