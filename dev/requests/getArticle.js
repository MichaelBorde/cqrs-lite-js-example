'use strict';

const axios = require('axios');

main().catch(console.error);

async function main() {
  const article = await get(
    'http://localhost:8080/articles/3ce6a7dc-7cec-43dd-85cc-d0353eafec6a'
  );
  console.log(article);
}

function get(url) {
  return axios
    .get(url)
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        const { status, data } = error.response;
        console.error(`${status}: ${data}`);
      } else {
        console.error(error.message);
      }
    });
}
