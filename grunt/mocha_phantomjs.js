'use strict';

module.exports = {
	options: {
		'reporter': 'xunit',
		'output': '<%= settings.app %>/scripts/test/results/result.xml'
	},
	dist: ['<%= settings.app %>/scripts/test/index.html'],
};