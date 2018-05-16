'use strict';

const axios = require('axios');

main().catch(console.error);

async function main() {
  const args = process.argv.slice(2);
  const id = args.length > 0 ? args[0] : '3ce6a7dc-7cec-43dd-85cc-d0353eafec6a';
  const article = await get(`http://localhost:8080/articles/${id}`);
  console.log(article);
}

function get(url) {
  return axios
    .get(url)
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        const { status, data } = error.response;
        throw new Error(`${status}: ${data}`);
      }
      throw error;
    });
}
