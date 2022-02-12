module.exports = {
  extends: ["plugin:react-hooks/recommended", "plugin:prettier/recommended"],

  env: {
    node: true,
    browser: true,
    jest: true,
  },

  settings: {},

  rules: {
    "class-methods-use-this": "off",
    "function-paren-newline": "off",
    "implicit-arrow-linebreak": "off",
    "no-confusing-arrow": "off",
    "no-continue": "off",
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "object-curly-newline": [
      "error",
      {
        ObjectExpression: { consistent: true },
        ObjectPattern: { consistent: true },
        ImportDeclaration: { consistent: true },
        ExportDeclaration: { consistent: true },
      },
    ],
    "operator-linebreak": "off",
    "import/no-default-export": 0,
    "import/prefer-default-export": "off",
    "react/jsx-one-expression-per-line": "off",
    "no-underscore-dangle": [0],
    "react/jsx-filename-extension": [0, { extensions: [".jsx", ".tsx"] }],
  },

  overrides: [],

  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },

  root: true, // don't look at parent directory
};
