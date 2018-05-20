require('./env');

module.exports = Object.assign({}, require('../jest.config.js'), {
  rootDir: '../../',
  testRegex: '/lib/.*\\.e2e\\.ts$'
});
