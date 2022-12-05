module.exports = {
	'env': {
		'commonjs': true,
		'es2021': true,
		'node': true,
		'jest': true
	},
	'extends': 'eslint:recommended',
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'rules': {
		'eqeqeq': 'error',
		'no-trailing-spaces': 'error',
		'object-curly-spacing': [
			'error', 'always'
		],
		'arrow-spacing': [
			'error', { 'before': true, 'after': true }
		],
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows' // Tällä asetuksella tulee herjoja tämän tiedoston rivinvaihdoista, mutta index.js:n rivinvaihdoista ei (käytän Windowsia) - en tiedä, miten tämän .eslintrc.js-tiedoston rivinvaihdot saisi "windowsmaisiksi", --fix ei tee asialle mitään.
		],
		'no-console': 0,
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		]
	}
}
