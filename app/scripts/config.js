requirejs.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        jquerymobile: '../bower_components/jquery-mobile/js/jquery.mobile',
        underscore: '../bower_components/lodash/dist/lodash',
        backbone: '../bower_components/backbone/backbone',
        marionette: '../bower_components/marionette/lib/core/amd/backbone.marionette',
        dust: '../bower_components/dustjs-linkedin/lib/dust',
        dustHelpers: '../bower_components/dustjs-linkedin-helpers/lib/dust-helpers',
        dustMarionette: '../bower_components/marionette-dust/src/amd/backbone.marionette.dust',
        'backbone.picky': '../bower_components/backbone.picky.extended/lib/amd/backbone.picky',
        'backbone.wreqr': '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
        'common_views': 'common/views',
        templates: 'common/templates',
        spin: '../bower_components/spinjs/spin',
        'spin.jquery': '../bower_components/spinjs/jquery.spin',

        'domain_list_view'         : 'modules/domain/list/view',
        'domain_list_controller'   : 'modules/domain/list/controller',
        'domain_entities'          : 'modules/domain/entities/domain',

        'challenge_list_view'      : 'modules/challenge/list/view',
        'challenge_list_controller': 'modules/challenge/list/controller',
        'challenge_entity'         : 'modules/challenge/entities/challenge',

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
            exports: '_'
        },
        backbone: {
            deps: ['jquery', 'underscore', 'dust'],
            exports: 'Backbone'
        },
        dustMarionette: ['backbone'],
        'backbone.picky': ['backbone'],
        dust: {
            exports: 'dust'
        },
        dustHelpers: ['dust'],
        templates: ['dust', 'dustMarionette'] // load dust before our compiled templates
    },
    deps: ['main'] // <-- run our app
});