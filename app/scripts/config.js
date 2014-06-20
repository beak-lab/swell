requirejs.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        underscore: '../bower_components/lodash/dist/lodash',
        backbone: '../bower_components/backbone/backbone',
        marionette: '../bower_components/marionette/lib/core/amd/backbone.marionette',
        dust: '../bower_components/dustjs-linkedin/lib/dust',
        dustHelpers: '../bower_components/dustjs-linkedin-helpers/lib/dust-helpers',
        dustMarionette: '../bower_components/marionette-dust/src/amd/backbone.marionette.dust',
        'backbone.picky': '../bower_components/backbone.picky/lib/amd/backbone.picky',
        'backbone.wreqr': '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.eventbinder': '../bower_components/backbone.eventbinder/lib/amd/backbone.eventbinder',
        'backbone.babysitter': '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
        templates: 'common/templates',
        spin: '../bower_components/spinjs/spin',
        'spin.jquery': '../bower_components/spinjs/jquery.spin',

        'domain_list_view'         : 'modules/domain/list/view',
        'domain_list_controller'   : 'modules/domain/list/controller',
        'domain_entities'          : 'modules/domain/entities/domain',

        'challenge_list_view'      : 'modules/challenge/list/view',
        'challenge_list_controller': 'modules/challenge/list/controller',
        'challenge_entity'         : 'modules/challenge/entities/challenge',

        'user_list_view'           : 'modules/user/list/view',
        'user_list_controller'     : 'modules/user/list/controller',
        'user_entity'              : 'modules/user/entities/user',

        'menu_list_view'           : 'modules/menu/list/view',
        'menu_list_controller'     : 'modules/menu/list/controller',
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
        dustMarionette: {
            deps: ['backbone']
        },
        dust: {
            exports: 'dust'
        },
        dustHelpers: ['dust'],
        templates: ['dust', 'dustMarionette'] // load dust before our compiled templates
    },
    deps: ['main'] // <-- run our app
});