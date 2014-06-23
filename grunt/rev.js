'use strict';

module.exports = {
    dist: {
        files: {
            src: [
                '!<%= settings.dist %>/scripts/{,*/}*.js',
                '<%= settings.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                '<%= settings.dist %>/styles/css/{,*/}*.css',
                '<%= settings.dist %>/styles/fonts/*'
            ]
        }
    }
};