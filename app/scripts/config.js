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
        'backbone.localstorage'    : '../bower_components/backbone.localstorage/backbone.localStorage-min',

        'spin'                     : '../bower_components/spinjs/spin',
        'spin.jquery'              : '../bower_components/spinjs/jquery.spin',

        'jquery-ui/core'           : '../bower_components/jquery.ui/ui/core',
        'jquery-ui/widget'         : '../bower_components/jquery.ui/ui/widget',
        'jquery-ui/mouse'          : '../bower_components/jquery.ui/ui/mouse',
        'jquery-ui/draggable'      : '../bower_components/jquery.ui/ui/draggable',
        'jquery-ui/droppable'      : '../bower_components/jquery.ui/ui/droppable',
        'jquery-ui/sortable'       : '../bower_components/jquery.ui/ui/sortable',
        'jquery.touch.punch'       : '../vendor/jquery.ui.touch-punch.min',

        'snapjs'                   : '../bower_components/snapjs/snap.min',

        'common_views'             : 'common/views',
        'templates'                : 'common/templates',

        'domain_list_view'         : 'modules/domain/list/view',
        'domain_list_controller'   : 'modules/domain/list/controller',
        'domain_entities'          : 'modules/domain/entities/domain',

        'challenge_list_view'      : 'modules/challenge/list/view',
        'challenge_list_controller': 'modules/challenge/list/controller',

        'challenge_show_view'      : 'modules/challenge/show/view',
        'challenge_show_controller': 'modules/challenge/show/controller',

        'challenge_activity_view'  : 'modules/challenge/activity/view',
        // 'challenge_activity_controller' : 'modules/challenge/activity/controller',

        'resource_entity'          : 'modules/challenge/entities/resource',
        'challenge_entity'         : 'modules/challenge/entities/challenge',
        'activity_entity'          : 'modules/challenge/entities/activity',

        'user_view'                : 'modules/user/profile/view',
        'user_controller'          : 'modules/user/profile/controller',
        'user_entity'              : 'modules/user/entities/user',

        'menu_view'                : 'modules/menu/show/view',
        'menu_controller'          : 'modules/menu/show/controller',
        'menu_entity'              : 'modules/menu/entities/menu',

        'sidebar_view'             : 'modules/sidebar/show/view',
        'sidebar_controller'       : 'modules/sidebar/show/controller',
        'sidebar_entity'           : 'modules/sidebar/entities/sidebar',

        'goal_create_view'         : 'modules/goal/create/view',
        'goal_create_controller'   : 'modules/goal/create/controller',
        'goal_entity'              : 'modules/goal/entities/goal',

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