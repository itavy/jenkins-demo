'use strict';

const { MongoClient } = require('mongodb');

let mDB = null;

/**
 * get mongo connection
 * @param {string} mongoURI mongo connect URI
 * @param {string} mongoDB mongo database
 * @returns {Promise<MongoClient>} resolves with mongo connection
 */
const getConnection = async ({
  mongoURI,
  mongoDB,
}) => {
  if (mDB === null) {
    const client = new MongoClient(mongoURI, {
      useNewUrlParser: true,
    });
    await client.connect();
    mDB = client.db(mongoDB);
  }
  return mDB;
};


module.exports = {
  getConnection,
};
