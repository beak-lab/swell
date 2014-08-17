/*global define */
'use strict';

define([
        'marionette',
        'templates'
        // 'jquery',
        // 'backbone',
        // 'app',
        // 'dust',
        // 'parsley',
        // 'dustMarionette',
    ],

    /**
    * Fake static app
    */
    function() {
        var App = new Backbone.Marionette.Application();
        App.context = 'test-app.js';

        App.root = '/'; // path prefix
        App.debug = 1;
        App.API = 'http://128.199.178.80:8080';

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

        return App;
    }
);