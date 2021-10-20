module.exports = {
  root: true,
  extends: "eslint:recommended",
  env: {
    "browser": true,
    "commonjs": true,
    "node": true,
    "es6": true
  },
  parserOptions: {
    "ecmaVersion": 2018
  },
  rules: {
    "no-console": "off",
    "strict": "off",
    "curly": "warn"
  }
}
