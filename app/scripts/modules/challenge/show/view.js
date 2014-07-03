'use strict';
define(['app', 'templates', 'dust', 'backbone.syphon', 'dustIterate', 'bootstrap.popover', 'swipejs'], function(App) {
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

            // onRender: function() {
                // if (window.plugins) {
                //     window.plugins.html5Video.initialize({
                //         "id-2": "howtoaceajobinterview.mp4",
                //     });

                //     window.plugins.html5Video.play("id-2");
                // }
            // },
            // videoClicked: function() {
                /*
                if (window.plugins) {
                    e.preventDefault();
                    VideoPlayer.play('file:///android_asset/www/' + $(e.target).attr('src'));
                }*/
            // },

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
                var total = this.$el.find('.activity__personal-goals__goal').length;
                var newgoalInput = $('<input type="hidden" name="goal[' + total + ']" value="' + text + '"/>');
                var newgoalDiv = $('<label class="mystuff__goals__goal"><input class="mystuff__goals__goal-checkbox checkboxable__checkbox" type="checkbox" />' + text + '</label>');
                //newgoalDiv.hide();
                newgoalDiv.css({'height' :  0, 'min-height' : 0});

                // this.$el.find('.activity__personal-goals').addClass('has-goals').prepend(newgoalDiv);
                this.$el.find('#goals').prepend(newgoalInput);
                newgoalDiv.animate({
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
                    create : function(evt, ui){
                        initCardPos = $(this).position().top;
                        $(this).css('position', 'absolute');
                    },
                    drag: function(evt, ui){
                        if( $(this).position().top <  initCardPos ){
                            return false;
                        };
                    },
                });


                var rater = this.$el.find('#rater'),
                    self = this;

                rater.on('change', function() {
                    console.log();
                    var status = 'Average';
                    switch (rater.val()) {
                        case '':
                            status = 'Rubbish';
                            break;
                        case '1':
                            status = 'Ok ish';
                            break;
                        case '2':
                            status = 'A bit nice';
                            break;
                        case '3':
                            status = 'Average';
                            break;
                        case '4':
                            status = 'Pretty good';
                            break;
                        case '5':
                            status = 'Awesome';
                            break;
                        case '6':
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
                var historyEl = this.$el.find('#mystuff-history');
                var cards = this.$el.find('.activity-history__card');
                var historySwipe = new Swipe(historyEl[0], {
                    continuous: true,
                    callback: function() {
                        var pagers = historyEl.find('.activity-history__pager-item').removeClass('is-active');
                        pagers.filter(function() {
                            return $(this).data('idx') === historySwipe.getPos();
                        }).addClass('is-active');
                    }
                });

                this.buildHistoryPager(historySwipe);

                var maxHeight = Math.max.apply(null, cards.map(function() {
                    return $(this).outerHeight();
                }));

                cards.outerHeight(maxHeight);
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