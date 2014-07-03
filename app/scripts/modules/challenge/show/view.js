'use strict';
define(['app', 'templates', 'dust', 'backbone.syphon', 'dustIterate', 'bootstrap.popover', 'swipejs', 'jquery.velocity'], function(App) {
    App.module('Challenge.Show.View', function(View, App, Backbone, Marionette, $) {
        View.Layout = Marionette.Layout.extend({
            template: 'challenge_show_layout',

            regions: {
                menuRegion: '#show_menu',
                // pageRegion: '#show_page'
            },

            events: {
                'click #challenge-description-expander': 'expanderclicked'
            },

            expanderclicked: function(e) {
                e.preventDefault();
                $('#challenge-description-expander, #challenge-description').toggleClass('is-expanded');
            },

            flash: function(cssClass) { // fade in and out.
                var $view = this.$el;
                $view.hide().toggleClass(cssClass).fadeIn(800, function() {
                    setTimeout(function() {
                        $view.toggleClass(cssClass);
                    }, 500);
                });
            },

        });

        View.ChallengeMenu = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'challenge_menu',

            events: {
                'click #challenge_menu span': 'clicked'
            },

            clicked: function(e) {
                e.preventDefault();
                $(this.el).find('.challenge__menu__item').removeClass('is-active');
                $(e.target).addClass('is-active');
                this.trigger('menu:clicked', e.target.id);

                // also hide the description
                // $('#challenge-description').hide();
                // $('#challenge-description-expander').hide();
                // actually, lets do it with css
                $('.challenge').addClass('is-compacted');
            }
        });

        View.Resources = Marionette.ItemView.extend({
            template: 'resources',
            events: {
                'click .resource__article__content-expander': 'resourceExpanderClicked',
                'click .resource__video__video': 'videoClicked'
            },


            resourceExpanderClicked: function(e) {
                $(e.target).closest('.resource__article').toggleClass('is-expanded');
            },

            serializeData: function() {
                var data = {};
                data.resources = this.options.resources;
                return data;
            },

        });

        View.Stuff = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'stuff',

            events: {
                'keyup #goal_name': 'addGoalform',
                'click #personal-goal-add-form' : 'addGoalform',

            },

            appendGoal: function(text) {
                var newgoalDiv = $('<label class="mystuff__goals__goal"><input class="mystuff__goals__goal-checkbox checkboxable__checkbox" type="checkbox" />' + text + '</label>');
                //newgoalDiv.hide();
                newgoalDiv.css({'height' :  0, 'min-height' : 0});

                // this.$el.find('.activity__personal-goals').addClass('has-goals').prepend(newgoalDiv);
                this.$el.find('#goals').prepend(newgoalDiv);
                newgoalDiv.velocity({
                    'min-height' : '5rem'
                }, 500).promise().done(function(){
                    newgoalDiv.css({'height' :  '', 'min-height' : ''});
                });
                //newgoalDiv.slideDown();
            },

            addGoalform: function(e) {
                e.preventDefault();
                if (e.keyCode === 13 || $(e.target).hasClass('activity-goal__icon')) {
                    var input = this.$el.find('#goal_name');
                    if( input.val().trim() ) {
                        this.appendGoal(input.val());
                        input.val('');
                    }
                }
            },

            serializeData: function() {
                return {
                    goals: this.options.goals,
                    activities: this.options.activities
                };
            },

            onRender: function() {
                // draggable on cards
                var initCardPos;

                this.$el.find('.activity-history__card:last-child').draggable({
                    axis: 'y',
                    revert: true,
                    revertDuration: 100,
                    create : function(){
                        initCardPos = $(this).position().top;
                        $(this).css('position', 'absolute');
                    },
                    drag: function(){
                        if( $(this).position().top <  initCardPos ){
                            return false;
                        }
                    },
                });


                var rater = this.$el.find('#rater'),
                    self = this;

                rater.on('change', function() {
                    var status;
                    var rounded = Math.round( rater.val() / 10 );
                    // console.log( rater.val() );
                    switch (rounded) {
                        case 0:
                            status = 'Rubbish';
                            break;
                        case 1:
                            status = 'Ok ish';
                            break;
                        case 2:
                            status = 'A bit nice';
                            break;
                        case 3:
                            status = 'Average';
                            break;
                        case 4:
                            status = 'Pretty good';
                            break;
                        case 5:
                            status = 'Awesome';
                            break;
                        case 6:
                            status = 'Life Changing';
                            break;
                    }

                    self.$el.find('#raterOutput').val(status);
                });

                this.$el.find('.mystuff__share-buddy').popover({
                    trigger: 'focus',
                    html: true,
                });
            },

            onShow: function() {
                var decks = this.$el.find('.activity-history__deck');
                var biggestHeight = 0;
                decks.each(function(){
                    var cards = $(this).find('.activity-history__card');
                    var maxHeight = Math.max.apply(null, cards.map(function() {
                        return $(this).outerHeight();
                    }));
                    cards.outerHeight(maxHeight);
                    biggestHeight = maxHeight > biggestHeight ? maxHeight : biggestHeight;
                });

                // console.log(decks);

                // decks.outerHeight(biggestHeight);


                
                var _this = this;
                var historyEl = this.$el.find('#mystuff-history');
                var decksContainer = historyEl.find('.activity-history__decks');
                
                var historySwipe = new Swipe(historyEl[0], {
                    continuous: true,
                    callback: function() {
                        //changes the pager
                        console.log(this);
                        var pagers = historyEl.find('.activity-history__pager-item').removeClass('is-active');
                        pagers.filter(function() {
                            return $(this).data('idx') === historySwipe.getPos();
                        }).addClass('is-active');

                        // set the height of the slider
                        _this.setDeckHeight(historySwipe, decksContainer);


                    }
                });

                this.setDeckHeight(historySwipe, decksContainer);
                this.buildHistoryPager(historySwipe);

            },
            setDeckHeight: function(historySwipe, decksContainer){
                var currentDeck = decksContainer.find('.activity-history__deck:eq(' + historySwipe.getPos() + ')');
                console.log(currentDeck);
                decksContainer.velocity({
                    'height' : currentDeck.outerHeight(),
                 }, 300 );
            },

            buildHistoryPager: function(swipe) {
                var historyEl = this.$el.find('#mystuff-history');
                var decks = historyEl.find('.activity-history__deck');
                var pager = $('<ul/>').addClass('activity-history__pager');

                //console.log(decks);

                decks.each(function(i) {
                    var li = $('<li/>')
                        .addClass('activity-history__pager-item')
                        .data('idx', i)
                    li.click(function() {
                        swipe.slide(i)
                    });
                    if (i === 0) {
                        li.addClass('is-active');
                    }
                    pager.append(li);
                });
                historyEl.append(pager);
            }

        });
    });

    return App.Challenge.Show.View;
});