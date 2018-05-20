'use strict';

const { get } = require('./common');

main().catch(console.error);

async function main() {
  const articles = await get('http://localhost:8080/articles');
  console.log(articles);
}
