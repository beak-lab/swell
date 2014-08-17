'use strict';

module.exports = {
    connect: {
        options: {
            port: 9000,
            livereload: 35729,
            // Change this to '0.0.0.0' to access the server from outside
            hostname: 'localhost',
            base: '<%= settings.app %>'
        },
        livereload: {
            options: {
                open: true,
                base: [
                    '.tmp',
                    ''
                ]
            }
        },
        test: {
            options: {
                port: 9001,
                base: [
                    '.tmp',
                    'test',
                    ''
                ]
            }
        },
        dist: {
            options: {
                open: true,
                base: '<%= settings.dist %>',
                livereload: false
            }
        }
    }
};