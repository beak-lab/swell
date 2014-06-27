'use strict';

module.exports = {
    options: {
        limit: 4
    },
    server: {
        tasks: ['watch'],
        options: {
            logConcurrentOutput: true
        }
    },
    test: [

    ],
    dist: [
        'newer:imagemin:dist',
        'newer:svgmin:dist',
        'htmlmin:dist',
        'newer:cssmin'
    ]
};