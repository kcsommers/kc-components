const commonEntries = require('./common-entries');
const reactEntries = require('./react-entries');
const deps = require('../package.json').dependencies;

module.exports = {
  name: 'kc_components',
  filename: 'remoteEntry.js',
  exposes: [
    ...Object.entries(commonEntries),
    ...Object.entries(reactEntries)
  ].reduce((entries, e) => {
    entries[e[0]] = e[1].import;
    return entries;
  }, {}),
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps.react
    },
    'react-dom': {
      singleton: true,
      requiredVersion: deps['react-dom']
    }
  }
};
