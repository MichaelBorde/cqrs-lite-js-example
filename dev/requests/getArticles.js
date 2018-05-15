'use strict';

const axios = require('axios');

main().catch(console.error);

async function main() {
  const articles = await get('http://localhost:8080/articles');
  console.log(articles);
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
