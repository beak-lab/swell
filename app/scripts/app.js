/*globals navigator, window, Snap*/
define([
        'jquery',
        'snapjs',
        'marionette'
    ],

    function($) {
        'use strict';

        var App = new Backbone.Marionette.Application();

        App.addRegions({
            leftRegion   : '#left-region',
            menuRegion   : '#menu-region',
            mainRegion   : '#main-region',
            rightRegion  : '#right-region',
            // same as:
            // App.container = new Backbone.Marionette.Region({el:'#main'});
        });

        // An init function for your main application object
        App.addInitializer(function() {
            this.debug = 1;
            this.root = '/'; // <- insert app name here? eg: app-name/

            // App.layout = new Layout();
            // $('body').prepend(App.layout.el);
            // App.layout.render();
            // App.layout.menu.show(myMenu);
        });

        // Close out the view and display nothing in #container.
        // region.close();

        // Add as many of these as you like
        App.addInitializer(function() {

            window.localStorage.setItem('goals[1]', JSON.stringify({
                goal: {
                    991 : 'Do what colour is your parachute online course',
                }
            }));
            window.localStorage.setItem('goals[5]', JSON.stringify({
                goal: {
                    992 : 'Apply for part time jobs in IT',
                }
            }));

        });

        App.navigate = function(route, options) {
            Backbone.history.navigate(route, options || {});
        };

        App.getCurrentRoute = function() {
            App.log('Get current route', 'App', 3);
            return Backbone.history.fragment;
        };

        /**
         * @param options
         */
        App.on('initialize:before', function() {
            App.log('Initialization Started', 'App', 2);
            // options.anotherThing = true; // Add more data to your options
        });

        /**
         * @param options
         */
        App.on('initialize:after', function() {
            if (Backbone.history) {
                // note: this is async, so the rest of the init code here will run first
                require([
                        'modules/menu/app',
                        'modules/sidebar/app',
                        'modules/user/app',
                        'modules/domain/app',
                        'modules/challenge/app',
                        'modules/goal/app',
                    ], function () {

                    Backbone.history.start();

                    var wWidth = $(window).width();

                    App.snapper = new Snap({
                        element: document.getElementById('page-region'),
                        maxPosition: wWidth *  0.9, // make the drawer width 90% of the screen size
                        minPosition: wWidth * -0.9,
                        minDragDistance: 10
                    });

                    // App.snapper.open('right');

                    // set a default route
                    if (App.getCurrentRoute() === '') {
                        App.trigger('domain:list');
                    } else {
                        App.trigger(App.getCurrentRoute());
                    }

                    if (navigator.splashscreen) { // if we are in mobile mode
                        navigator.splashscreen.hide();
                    }
                });
            }

            App.log('Initialization Finished', 'App', 2);
        });

        /**
         * App changer
         */
        App.switchApp = function(appName, args) {
            // do not initalise a new module if no name is given
            var currentApp = appName ? App.module(appName) : null;

            if (App.currentApp === currentApp) { // only change if needed
                return;
            }

            App.log('Switching to: ' + appName, 'App', 1);

            if (App.currentApp) {
                App.currentApp.stop();
            }

            App.currentApp = currentApp;
            if (currentApp) {
                currentApp.start(args);
            }
        };

        /**
         * Log function.
         * Pass all messages through here so we can disable for prod
         */
        App.log = function(message, domain, level) {
            if (App.debug < level) {
                return;
            }
            if (typeof message !== 'string') {
                console.log('Fancy object (' + domain + ')', message);
            } else {
                console.log((domain || false ? '(' + domain + ') ' : '') + message);
            }
        };

        // Return the instantiated App (there should only be one)
        return App;

    }
);