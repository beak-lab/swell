'use strict';

requirejs.config({
    paths: {
        jquery                     : '../bower_components/jquery/dist/jquery.min',
        underscore                 : '../bower_components/lodash/dist/lodash',
        backbone                   : '../bower_components/backbone/backbone',
        marionette                 : '../bower_components/marionette/lib/core/amd/backbone.marionette',
        dust                       : '../bower_components/dustjs-linkedin/lib/dust',
        dustHelpers                : '../bower_components/dustjs-linkedin-helpers/lib/dust-helpers',
        dustMarionette             : '../bower_components/marionette-dust/src/amd/backbone.marionette.dust',
        'backbone.picky'           : '../bower_components/backbone.picky.extended/lib/amd/backbone.picky',
        'backbone.wreqr'           : '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.syphon'          : '../bower_components/backbone.syphon/lib/amd/backbone.syphon.min',
        'backbone.babysitter'      : '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',

        'spin'                     : '../bower_components/spinjs/spin',
        'spin.jquery'              : '../bower_components/spinjs/jquery.spin',

        'jquery-ui/widget'         : '../bower_components/jquery-ui/ui/jquery.ui.widget',
        'jquery-ui/mouse'          : '../bower_components/jquery-ui/ui/jquery.ui.mouse',
        'jquery-ui/sortable'       : '../bower_components/jquery-ui/ui/jquery.ui.sortable',
        'jquery-ui/draggable'      : '../bower_components/jquery-ui/ui/jquery.ui.draggable',
        'jquery-ui/droppable'      : '../bower_components/jquery-ui/ui/jquery.ui.droppable',
        'jquery-ui/core'           : '../bower_components/jquery-ui/ui/jquery.ui.core',
        'jquery.touch.punch'       : '../vendor/jquery.ui.touch-punch.min',

        'snapjs'                   : '../bower_components/snapjs/snap.min',

        'common_views'             : 'common/views',
        'templates'                : 'common/templates',

        'domain_list_view'         : 'modules/domain/list/view',
        'domain_list_controller'   : 'modules/domain/list/controller',
        'domain_entities'          : 'modules/domain/entities/domain',

        'challenge_list_view'      : 'modules/challenge/list/view',
        'challenge_list_controller': 'modules/challenge/list/controller',
        'challenge_entity'         : 'modules/challenge/entities/challenge',

        'challenge_show_view'      : 'modules/challenge/show/view',
        'challenge_show_controller': 'modules/challenge/show/controller',

        'user_view'                : 'modules/user/profile/view',
        'user_controller'          : 'modules/user/profile/controller',
        'user_entity'              : 'modules/user/entities/user',

        'menu_view'                : 'modules/menu/show/view',
        'menu_controller'          : 'modules/menu/show/controller',
        'menu_entity'              : 'modules/menu/entities/menu',

        /**===== yeoman hook =====**/
        /**This above hook is required for Mr.Yeoman, touch not it, nor it's indentation... please. **/

    },
    shim: {
        underscore: {
            exports                : '_'
        },
        backbone: {
            deps                   : ['jquery', 'underscore', 'dust'],
            exports                : 'Backbone'
        },
        dustMarionette             : ['backbone'],
        'backbone.picky'           : ['backbone'],
        'jquery-ui/core'           : ['jquery'],
        'jquery-ui/mouse'          : ['jquery-ui/core', 'jquery-ui/widget'],
        'jquery-ui/widget'         : ['jquery-ui/core'],
        'jquery-ui/draggable'      : ['jquery-ui/mouse'],
        'jquery-ui/droppable'      : ['jquery-ui/draggable'],
        'jquery-ui/sortable'       : ['jquery-ui/core', 'jquery-ui/widget'],
        'jquery.touch.punch'       : ['jquery'],
        dust: {
            exports                : 'dust'
        },
        dustHelpers                : ['dust'],
        templates                  : ['dust', 'dustMarionette'] // load dust before our compiled templates
    },
    deps                           : ['main'] // <-- run our app
});

/*globals navigator*/
var mobileFound = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (mobileFound) {
    require(['main', '../cordova'], function() {
        console.log('Init');
    });
} else {
    require(['main'], function() {
        console.log('Init Non Mobile');
    });
    // libs.push('//localhost:35729/livereload.js');
}