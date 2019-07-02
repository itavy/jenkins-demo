'use strict';

const semver = require('semver');

const minNodeVersion = '10.15.0';

/**
 * check if min nodejs requirements are met
 * @returns {module:jenkins-demo} server module
 */
const getVersionModule = () => {
  if (semver.lt(process.version, minNodeVersion)) {
    throw Error(`Invalid node version for jenkins-demo, current: ${process.version}, min: ${minNodeVersion}`);
  }
  // eslint-disable-next-line global-require
  return require('./lib/latest');
};

if (require.main === module) {
  getVersionModule().startServer({
    configPath: Object.hasOwnProperty.call(process.env, 'SERVER_CONFIG')
      ? process.env.SERVER_CONFIG : null,
  });
}

module.exports = getVersionModule();
