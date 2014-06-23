'use strict';

module.exports = {
    dist: {
        files: [{
            dot: true,
            src: [
                '.tmp',
                '<%= settings.dist %>/*',
                '!<%= settings.dist %>/.git*'
            ]
        }]
    },
    server: '.tmp',
    postBuild: {
        src: [
            '<%= settings.dist %>/*.temp',
            '<%= settings.dist %>/scripts/modules',
            '<%= settings.dist %>/scripts/common',
        ]
    }
};