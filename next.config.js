const withCSS = require("@zeit/next-css")

module.exports = withCSS({
	webpack: (config, { webpack }) => {
		config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
		return config
	}
})
