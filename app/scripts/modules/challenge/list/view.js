'use strict';
define(['app', 'templates', 'dust'], function(App) {
    App.module('ChallengeApp.List.View', function(View, App, Backbone, Marionette) { // , $, _
        var contextName = 'ChallengeApp.List.View';
        
        View.Layout = Marionette.Layout.extend({
            template: 'challenge_layout',

            regions: {
                panelRegion: '#panel-region',
                challengeRegion: '.content'
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

        // View.Panel = Marionette.ItemView.extend({
        //     template: panelTpl,

        //     triggers: {
        //         'click button.js-new': 'challenge:new'
        //     },

        //     events: {
        //         'submit #filter-form': 'filterChallenges'
        //     },

        //     ui: {
        //         criterion: 'input.js-filter-criterion'
        //     },

        //     filterChallenges: function(e){
        //         e.preventDefault();
        //         var criterion = this.$('.js-filter-criterion').val();
        //         this.trigger('challenges:filter', criterion);
        //     },

        //     onSetFilterCriterion: function(criterion){
        //         this.ui.criterion.val(criterion);
        //     }
        // });

        View.ChallengeOne = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'challenge_list_one',

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
                this.trigger('challenge:show', this.model);
            },

            deleteClicked: function(e) {
                e.stopPropagation();
                this.trigger('challenge:delete', this.model);
            },

            remove: function() { // automatically called when this model is destroy() 'ed
                var self = this;
                this.$el.fadeOut(function() {
                    Marionette.ItemView.prototype.remove.call(self);
                });
            }
        });

        var ChallengeEmpty = Marionette.ItemView.extend({
            template: 'challenge_none',
            // tagName: 'div',
            className: 'alert'
        });

        View.Challenge = Marionette.CompositeView.extend({
            tagName: 'div',
            className: '',
            template: 'challenge_list',
            emptyView: ChallengeEmpty,
            itemView: View.ChallengeOne,
            itemViewContainer: '.challenge_list',

            initialize: function() {
                App.log('init called', contextName, 1);
                this.listenTo(this.collection, 'reset', function() {
                    App.log('reset called', contextName, 1);
                    this.appendHtml = function(collectionView, itemView) { //, index) {
                        collectionView.$el.append(itemView.el);
                    };
                });
            },

            onCompositeCollectionRendered: function() {
                App.log('rendered called', contextName, 1);
                this.appendHtml = function(collectionView, itemView) { //, index) {
                    collectionView.$el.prepend(itemView.el);
                };
            }
        });
        
    });

    return App.ChallengeApp.List.View;
});