const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');

const plugins = [
  postcssNested,
  autoprefixer({
    browsers: 'last 3 versions',
  }),
];

module.exports = {
  plugins,
};
