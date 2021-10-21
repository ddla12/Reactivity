const path = require("path");

module.exports = {
    mode: "production",
    entry: './dist/module/src/index.js',
    output: {
      filename: 'reactivity.min.js',
      path: path.resolve(__dirname, './dist/cdn/'),
    },
};