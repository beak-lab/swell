'use strict';
define(['app', 'templates', 'dust'], function(App) {
    App.module('UserApp.List.View', function(View, App, Backbone, Marionette) { // , $, _
        var contextName = 'UserApp.List.View';
        
        View.Layout = Marionette.Layout.extend({
            template: 'user_layout',

            regions: {
                panelRegion: '#panel-region',
                userRegion: '.content'
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
        //         'click button.js-new': 'user:new'
        //     },

        //     events: {
        //         'submit #filter-form': 'filterUsers'
        //     },

        //     ui: {
        //         criterion: 'input.js-filter-criterion'
        //     },

        //     filterUsers: function(e){
        //         e.preventDefault();
        //         var criterion = this.$('.js-filter-criterion').val();
        //         this.trigger('users:filter', criterion);
        //     },

        //     onSetFilterCriterion: function(criterion){
        //         this.ui.criterion.val(criterion);
        //     }
        // });

        View.UserOne = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'user_list_one',

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
                this.trigger('user:show', this.model);
            },

            deleteClicked: function(e) {
                e.stopPropagation();
                this.trigger('user:delete', this.model);
            },

            remove: function() { // automatically called when this model is destroy() 'ed
                var self = this;
                this.$el.fadeOut(function() {
                    Marionette.ItemView.prototype.remove.call(self);
                });
            }
        });

        var UserEmpty = Marionette.ItemView.extend({
            template: 'user_none',
            // tagName: 'div',
            className: 'alert'
        });

        View.User = Marionette.CompositeView.extend({
            tagName: 'div',
            className: '',
            template: 'user_list',
            emptyView: UserEmpty,
            itemView: View.UserOne,
            itemViewContainer: '.user_list',

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

    return App.UserApp.List.View;
});