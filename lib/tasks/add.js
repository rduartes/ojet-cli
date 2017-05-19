#! /usr/bin/env node
/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/

'use strict';

/**
 * ## Dependencies
 */
// Oracle utils
const config = require('../../config');
const utils = require('../utils');

// Oracle command libs
const app = require('../scopes/app');
const platformAndPlugin = require('../scopes/platform.plugin');

/**
 * # Switch for 'add' task
 *
 * @public
 * @param {string} scope
 * @param {Array} [parameters]
 * @param {Object} [options]
 */
module.exports = function (scope, parameters, options) {
  const task = config.tasks.add.name;
  const scopes = config.tasks.add.scopes;
  const parameter = parameters[0];

  switch (scope) {
    case scopes.hybrid.name:
      if (parameter) {
        utils.log.error(utils.toNotSupportedMessage(`${task} ${scope} ${parameter}`));
      } else {
        app.delegateToGenerator('add-hybrid', '', options);
      }
      break;
    case scopes.platform.name:
    case scopes.plugin.name: {
      // For 3.1.0 we do not want to support passing options
      platformAndPlugin(task, scope, parameters, { save: true });
      break;
    }
    case scopes.sass.name:
      if (parameter) {
        utils.log.error(utils.toNotSupportedMessage(`${task} ${scope} ${parameter}`));
      } else {
        app.delegateToGenerator('add-sass');
      }
      break;
    case scopes.theme.name:
      app.delegateToGenerator('add-theme', parameter);
      break;
    case undefined:
      utils.log.error(utils.toMissingInputMessage(`${task} ${scope}`));
      break;
    default:
      utils.log.error(utils.toNotSupportedMessage(`${task} ${scope}`));
  }
};