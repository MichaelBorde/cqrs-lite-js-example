'use strict';

const { get } = require('./common');

main().catch(console.error);

async function main() {
  const args = process.argv.slice(2);
  const id = args.length > 0 ? args[0] : '3ce6a7dc-7cec-43dd-85cc-d0353eafec6a';
  const article = await get(`http://localhost:8080/articles/${id}`);
  console.log(article);
}
