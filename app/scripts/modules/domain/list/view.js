'use strict';
define(['app'], function(App) {
    App.module('Domain.List.View', function(View, App, Backbone, Marionette) { // , $, _
        View.Layout = Marionette.Layout.extend({
            template: 'domain_layout',

            regions: {
                domainRegion: '#domain_content'
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

        View.DomainOne = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'domain_list_one',

            events: {
                'click .domain-list__item': 'showClicked',
            },

            showClicked: function(e) {
                e.preventDefault();
                e.stopPropagation();
                // var target = $(e.target);
                // if (! target.is('.domain-list__item')) {
                //     target = target.closest('.domain-list__item');
                // }

                // target.addClass('is-selected');
                this.trigger('domain:show', this.model);
            },

        });

        View.Domain = Marionette.CompositeView.extend({
            // tagName: 'div',
            // className: '',
            template: 'domain_list',
            itemView: View.DomainOne,
            itemViewContainer: '#domain_list',

            onCompositeCollectionRendered: function(){
                var domains = $('.domain-list__item');
                domains.each(function(i){
                    var $this = $(this);
                    setTimeout(function(){
                        $this.addClass('is-ready');
                    }, i * 50 + 50);
                });
            }

            // initialize: function() {
            //     this.listenTo(this.collection, 'reset', function() {
            //         App.log('reset called', 'Domain list view', 1);
            //         this.appendHtml = function(collectionView, itemView) { //, index) {
            //             collectionView.$el.append(itemView.el);
            //         };
            //     });
            // },

            // onCompositeCollectionRendered: function() {
            //     App.log('rendered called', 'Domain list view', 1);
            //     this.appendHtml = function(collectionView, itemView) { //, index) {
            //         collectionView.$el.prepend(itemView.el);
            //     };
            // }
        });
    });

    return App.Domain.List.View;
});