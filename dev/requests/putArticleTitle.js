'use strict';

const { put } = require('./common');

main().catch(console.error);

async function main() {
  const args = process.argv.slice(2);
  const id = args.length > 0 ? args[0] : '3ce6a7dc-7cec-43dd-85cc-d0353eafec6a';
  await put(`http://localhost:8080/articles/${id}/title`, {
    title: `Time is ${new Date()}`
  });
}
