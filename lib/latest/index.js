'use strict';

const { getServer } = require('./server');
const { getConfig } = require('./loadConfig');
const { getConnection } = require('./mongo');
/**
 * start server
 * @param {string} configPath configuration file
 * @returns {undefined} nothing
 */
const startServer = async ({ configPath }) => {
  const {
    port,
    address,
    mongoURI,
    mongoDB,
    ...serverOptions
  } = getConfig({ configPath });
  const mongoConnection = await getConnection({
    mongoURI,
    mongoDB,
  });
  const serverInstance = await getServer(Object.assign(
    {},
    serverOptions,
    {
      mongoConnection,
    }
  ));

  serverInstance.listen(port, address, (err, listenAddress) => {
    if (err) throw err;
    serverInstance.log.info(`server listening on ${listenAddress}`);
  });
};

module.exports = {
  startServer,
};
