module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/recommended',
    'airbnb-base'
  ],
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never',
      'svg' : 'ignorePackages'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': [2, {
        'props': false
    }],
    'object-shorthand': 0,
    'max-len': ['error', 500],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['\.svg'],
      },
    ],
    'func-names': ['off']
  },
  globals: {},
  settings: {
    'import/resolver': {
      webpack: 'webpack.config.js',
      node: {
        extensions: ['.js','.vue'],
      },
    },
  },
}
