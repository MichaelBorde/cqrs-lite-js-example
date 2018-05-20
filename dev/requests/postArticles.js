'use strict';

const { post } = require('./common');

main().catch(console.error);

async function main() {
  const articles = [
    {
      id: '3ce6a7dc-7cec-43dd-85cc-d0353eafec6a',
      title: 'Hello',
      text: 'This is a new cat'
    },
    {
      id: '8f823577-825c-4e4e-b0f1-c1825a8cd3ad',
      title: 'Today',
      text: 'I bought a game'
    },
    {
      id: 'f92cfe89-486d-453d-8909-dd2f8b360784',
      title: 'Cool',
      text: "It's alive"
    }
  ];

  for (let article of articles) {
    await post('http://localhost:8080/articles', article);
  }
}
