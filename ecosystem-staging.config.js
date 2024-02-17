module.exports = {
	apps: [{
		name: 'staging',
		script: './app.js',
		max_memory_restart: '200M',
		node_args: '--env-file=.env',
		watch: true,
		ignore_watch: ['node_modules', 'logs/requests.log', 'logs/error.log', 'common/assets/quotes/quotes.json', 'common/assets/quotes/error-quotes.json'],
	}]
};