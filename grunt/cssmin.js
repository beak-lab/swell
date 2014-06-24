'use strict';

module.exports = {
    dist: {
        files: {
            '<%= settings.dist %>/styles/css/main.min.css': [
                '<%= settings.app %>/styles/css/*.css'
            ]
        }

    }
};