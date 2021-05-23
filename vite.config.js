const { createVuePlugin } = require('vite-plugin-vue2')
// const { eslint } = require('@rollup/plugin-eslint')
// import eslint from '@rollup/plugin-eslint'

module.exports = {
	plugins: [createVuePlugin()],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:3004/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
}
