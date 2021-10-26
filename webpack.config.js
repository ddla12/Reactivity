const path = require("path");

module.exports = {
    mode: "production",
    entry: './dist/index.js',
    output: {
      filename: 'reactivity.min.js',
      path: path.resolve(__dirname, './dist/cdn/'),
    },
};