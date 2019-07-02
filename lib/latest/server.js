'use strict';

const fastify = require('fastify');

/**
 * get fastify server
 * @param {boolean} logger=true logging enabled
 * @param {MongoClient} mongoConnection mongo connection
 * @returns {fastify} server instance
 */
const getServer = async ({
  logger = true,
  mongoConnection,
}) => {
  const server = fastify({
    logger,
  });

  server.get('/', async (request, reply) => {
    reply.type('application/json')
      .code(200);
    return { status: 'OK' };
  });


  server.get('/redis', async (request, reply) => {
    reply.type('application/json')
      .code(200);
    return { status: 'redis' };
  });

  server.get('/mongo/:id', async (request, reply) => {
    const { id } = request.params;
    const result = await mongoConnection.collection('jenkinsdemo')
      .find({ id })
      .limit(1)
      .toArray();
    let statusCode = 400;
    let response = {};
    if (result.length !== 0) {
      statusCode = 200;
      [response] = result;
    }
    reply.type('application/json')
      .code(statusCode);
    return response;
  });

  server.get('/mongo', async (request, reply) => {
    reply.type('application/json')
      .code(200);
    return { status: 'mongo' };
  });
  return server;
};


module.exports = {
  getServer,
};
