const path = require('path');
const logger = require('debug')('creator:env');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const config = require('./index');

function loadEnv(mode) {
  const basePath = path.resolve(config.appDirectory, `.env${mode ? `.${mode}` : ``}`)
  const localPath = `${basePath}.local`

  const load = envPath => {
    try {
      const env = dotenv.config({ path: envPath, debug: process.env.DEBUG })
      dotenvExpand(env)
    } catch (err) {
      logger.error(err);
    }
  }

  load(localPath)
  load(basePath)
}

module.exports = loadEnv;
