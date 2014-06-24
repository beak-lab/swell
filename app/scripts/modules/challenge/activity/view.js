'use strict';
define(['app', 'templates', 'dust'], function(App) {
    App.module('Challenge.Activity.View', function(View, App, Backbone, Marionette) { // , $, _
        View.Layout = Marionette.Layout.extend({
            template: 'activity_show_layout',

            regions: {
                activityRegion: '#activity-region'
            },

        });

        View.ActivityOne = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'activity_list_one',

            events: {
                'click': 'highlightName',
                'click td a.js-show': 'showClicked',
                'click button.js-delete': 'deleteClicked'
            },

            highlightName: function() {
                this.$el.toggleClass('warning');
            },

            showClicked: function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('activity:show', this.model);
            },

            deleteClicked: function(e) {
                e.stopPropagation();
                this.trigger('activity:delete', this.model);
            },

            remove: function() { // automatically called when this model is destroy() 'ed
                var self = this;
                this.$el.fadeOut(function() {
                    Marionette.ItemView.prototype.remove.call(self);
                });
            }
        });

        var ActivityEmpty = Marionette.ItemView.extend({
            template: 'activity_none',
            // tagName: 'div',
            className: 'alert'
        });

        View.Activity = Marionette.CompositeView.extend({
            tagName: 'div',
            className: '',
            template: 'activity_list',
            emptyView: ActivityEmpty,
            itemView: View.ActivityOne,
            itemViewContainer: '.activity_list',

            initialize: function() {
                this.listenTo(this.collection, 'reset', function() {
                    this.appendHtml = function(collectionView, itemView) { //, index) {
                        collectionView.$el.append(itemView.el);
                    };
                });
            },

            onCompositeCollectionRendered: function() {
                this.appendHtml = function(collectionView, itemView) { //, index) {
                    collectionView.$el.prepend(itemView.el);
                };
            }
        });

    });

    return App.Challenge.Activity.View;
});