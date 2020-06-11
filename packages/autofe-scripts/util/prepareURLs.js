/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file at
 * https://github.com/facebookincubator/create-react-app/blob/master/LICENSE
 */

const url = require('url')
const { chalk } = require('@vue/cli-shared-utils')
const address = require('address')
const defaultGateway = require('default-gateway')

module.exports = function prepareUrls (protocol, host, port, pathname = '/') {
  const formatUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port,
      pathname
    })
  const prettyPrintUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port: chalk.bold(port),
      pathname
    })

  const isUnspecifiedHost = host === '0.0.0.0' || host === '::'
  let prettyHost, lanUrlForConfig
  if (isUnspecifiedHost) {
    prettyHost = 'localhost'
    try {
      // This can only return an IPv4 address
      const result = defaultGateway.v4.sync()
      const ip = address.ip(result && result.interface)
      if (ip) {
        // Check if the address is a private ip
        // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
        if (
          /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(
            ip
          )
        ) {
          lanUrlForConfig = ip
        }
      }
    } catch (_e) {
      // ignored
    }
  } else {
    prettyHost = host
    lanUrlForConfig = host
  }
  const lanUrlForTerminal = lanUrlForConfig
    ? prettyPrintUrl(lanUrlForConfig)
    : chalk.gray('unavailable')
  const lanUrlForBrowser = lanUrlForConfig
    ? formatUrl(lanUrlForConfig)
    : undefined
  const localUrlForTerminal = prettyPrintUrl(prettyHost)
  const localUrlForBrowser = formatUrl(prettyHost)
  return {
    lanUrlForConfig,
    lanUrlForTerminal,
    lanUrlForBrowser,
    localUrlForTerminal,
    localUrlForBrowser
  }
}
