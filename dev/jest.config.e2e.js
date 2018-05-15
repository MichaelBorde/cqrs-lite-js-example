process.env.DB_URL = 'postgres://postgres@localhost:5432/blog_tests';

module.exports = Object.assign({}, require('./jest.config.js'), {
  testRegex: '/lib/.*\\.e2e\\.ts$'
});
