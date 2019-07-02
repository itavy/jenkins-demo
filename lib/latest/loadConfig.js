'use strict';

const fs = require('fs');
const jsYaml = require('js-yaml');

const DEFAULT_CONFIG = {
  port:    3000,
  address: '0.0.0.0',
  logger:  true,
};


/**
 * load config file
 * @param {string} configPath config file path
 * @returns {object} loaded config options
 */
const loadConfig = ({ configPath = null }) => {
  try {
    if (configPath !== null) {
      return jsYaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
    }
    return {};
  } catch (e) {
    process.stdout.write(`Error loading config file: ${e.message}`);
    throw e;
  }
};

/**
 * get configuration options
 * @param {string} configPath config file path
 * @returns {object} loaded config options
 */
const getConfig = ({ configPath = null }) => Object.assign(
  {},
  DEFAULT_CONFIG,
  loadConfig({ configPath })
);

module.exports = {
  getConfig,
};
