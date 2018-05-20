'use strict';

const { put } = require('./common');

main().catch(console.error);

async function main() {
  await put(
    'http://localhost:8080/articles/3ce6a7dc-7cec-43dd-85cc-d0353eafec6a/title',
    {
      title: `Time is ${new Date()}`
    }
  );
}
