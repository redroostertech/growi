require('module-alias/register');
const logger = require('@alias/logger')('growi:migrate:normalize-locale-id');

const mongoose = require('mongoose');
const config = require('@root/config/migrate');

const { getModelSafely } = require('@commons/util/mongoose-utils');

module.exports = {
  async up(db, client) {
    logger.info('Apply migration');
    mongoose.connect(config.mongoUri, config.mongodb.options);

    const Config = getModelSafely('Config') || require('@server/models/config')();
    const User = getModelSafely('User') || require('@server/models/user')();

    await Promise.all([
      // update en-US -> en_US
      Config.update(
        { key: 'app:globalLang', value: JSON.stringify('en-US') },
        { value: JSON.stringify('en_US') },
      ),
      // update ja -> ja_JP
      Config.update(
        { key: 'app:globalLang', value: JSON.stringify('ja') },
        { value: JSON.stringify('ja_JP') },
      ),

      // update en-US -> en_US
      User.updateMany(
        { lang: 'en-US' },
        { lang: 'en_US' },
      ),
      // update ja -> ja_JP
      User.updateMany(
        { lang: 'ja' },
        { lang: 'ja_JP' },
      ),
    ]);

    logger.info('Migration has successfully applied');
  },

  async down(db, client) {
    // do not rollback
  },
};
