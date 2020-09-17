module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 7,
    sourceTyoe: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-mixed-operators': 'off',
    'no-useless-constructor': 'off',
    eqeqeq: 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
}
