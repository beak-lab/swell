/*global location, navigator */

require([
        'jquery',
        'backbone',
        'app',
        'marionette',
        'dust',
        'dustHelpers',
        'dustMarionette',
        'templates',
        'jquery.touch.punch',
        'backbone.localstorage'
    ],

    function($, Backbone, App) {
        'use strict';

        var mobileFound = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        // make a separate list, so that it will not get packaged into the main js file
        // but the app can still require them after it starts
        var unRequiredList = ['../cordova', '../cordova_plugins'];

        if (mobileFound) {
            require(unRequiredList, function() {
                console.log('Init');
                $(function() {
                    App.start();
                });
            });
        } else {
            console.log('Init Non Mobile');
            $(function() {
                App.start();
            });
            // libs.push('//localhost:35729/livereload.js');
        }

        // any extras?
        App.on('initialize:after', function() {
            // if (Backbone.history){
            // Backbone.history.start();
            // }
        });

        // Define your master router on the application namespace and trigger all
        // navigation from this instance.
        // App.start();

        // All navigation that is relative should be passed through the navigate
        // method, to be processed by the router. If the link has a `data-bypass`
        // attribute, bypass the delegation completely.
        $(document).on('click', 'a:not([data-bypass])', function(e) {
            // Get the absolute anchor href.
            var href = {
                prop: $(this).prop('href'),
                attr: $(this).attr('href')
            },
                root = location.protocol + '//' + location.host + App.root;

            // Ensure the root is part of the anchor href, meaning it's relative.
            if (href.prop && href.prop.slice(0, root.length) === root) {
                e.preventDefault();
                Backbone.history.navigate(href.attr, true);
            }
        });

        $(document).on('click', 'a[data-bypass]', function(e) {
            e.preventDefault();
        });

    }
);