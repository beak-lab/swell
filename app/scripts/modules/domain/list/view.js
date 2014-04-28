'use strict';
define(['app'], function(App) {
    App.module('DomainApp.List.View', function(View, App, Backbone, Marionette) { // , $, _
        View.Layout = Marionette.Layout.extend({
            template: 'domain_layout',

            regions: {
                panelRegion: '#panel-region',
                domainRegion: '#content'
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
        //         'click button.js-new': 'domain:new'
        //     },

        //     events: {
        //         'submit #filter-form': 'filterDomains'
        //     },

        //     ui: {
        //         criterion: 'input.js-filter-criterion'
        //     },

        //     filterDomains: function(e){
        //         e.preventDefault();
        //         var criterion = this.$('.js-filter-criterion').val();
        //         this.trigger('domains:filter', criterion);
        //     },

        //     onSetFilterCriterion: function(criterion){
        //         this.ui.criterion.val(criterion);
        //     }
        // });

        View.DomainOne = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'domain_list_one',

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
                this.trigger('domain:show', this.model);
            },

            deleteClicked: function(e) {
                e.stopPropagation();
                this.trigger('domain:delete', this.model);
            },

            remove: function() { // automatically called when this model is destroy() 'ed
                var self = this;
                this.$el.fadeOut(function() {
                    Marionette.ItemView.prototype.remove.call(self);
                });
            }
        });

        var DomainEmpty = Marionette.ItemView.extend({
            template: 'domain_none',
            // tagName: 'div',
            className: 'alert'
        });

        View.Domain = Marionette.CompositeView.extend({
            tagName: 'div',
            className: '',
            template: 'domain_list',
            emptyView: DomainEmpty,
            itemView: View.DomainOne,
            itemViewContainer: '.domain_list',

            initialize: function() {
                this.listenTo(this.collection, 'reset', function() {
                    App.log('reset called', 'domain list view', 1);
                    this.appendHtml = function(collectionView, itemView) { //, index) {
                        collectionView.$el.append(itemView.el);
                    };
                });
            },

            onCompositeCollectionRendered: function() {
                App.log('rendered called', 'domain list view', 1);
                this.appendHtml = function(collectionView, itemView) { //, index) {
                    collectionView.$el.prepend(itemView.el);
                };
            }
        });
    });

    return App.DomainApp.List.View;
});