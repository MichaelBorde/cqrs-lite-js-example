'use strict';

const axios = require('axios');

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

function post(url, data) {
  return axios
    .post(url, data)
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        const { status, data } = error.response;
        throw new Error(`${status}: ${data}`);
      }
      throw error;
    });
}

function put(url, data) {
  return axios
    .put(url, data)
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        const { status, data } = error.response;
        throw new Error(`${status}: ${data}`);
      }
      throw error;
    });
}

module.exports = {
  get,
  post,
  put
};
