module.exports = {
    'extends': 'eslint:recommended',
    "parserOptions": {
        "ecmaVersion": 2017
    },
    'rules': {
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always']
    },
    'env': {
        'node': true,
        'es6': true
    }
}