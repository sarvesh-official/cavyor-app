const { build } = require('@vercel/node');

module.exports = build({
  entrypoint: 'dist/main.js',
});
