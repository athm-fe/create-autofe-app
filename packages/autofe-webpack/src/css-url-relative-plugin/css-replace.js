/*
MIT License http://www.opensource.org/licenses/mit-license.php
Author yibn2008<yibn2008@qq.com>
*/
'use strict'

const parseImport = require('parse-import')

const COMMENT_RULE = /\/\*([\s\S]*?)\*\//g
const RESOLVE_RULE = /@import\s+[^;]*;|url\(([^)]*)\)/g

/**
 * resolve @import and url(...)
 *
 * @param {String} content
 * @param {Function} replacer
 */
function cssReplace (content, replacer) {
  // replace all comments to comment mark /*{ID}*/
  const comments = []
  content = content.replace(COMMENT_RULE, (comment) => {
    const id = comments.length
    comments.push(comment)
    return `/*${id}*/`
  })

  // replace @import with replacer
  content = content.replace(RESOLVE_RULE, (statement, urlPath) => {
    if (statement.startsWith('@import')) {
      // remove possible comments
      statement = statement.replace(COMMENT_RULE, '')

      const parsed = parseImport(statement)
      if (!parsed.length) {
        throw new Error(`parse rule ${statement} failed`)
      }

      /**
       * parsed[0]: {
       *   path: 'foobar.css',
       *   condition: 'print',
       *   rule: '@import url("foobar.css") print'
       * }
       */
      return replacer(Object.assign({
        type: 'import'
      }, parsed[0]))
    } else {
      // remove possible comments
      urlPath = urlPath.replace(COMMENT_RULE, '').trim()

      const clearPath = urlPath.replace(/['"]/g, '')

      return replacer({
        type: 'url',
        path: clearPath,
        condition: '',
        rule: `url(${urlPath})`
      })
    }
  })

  // replace back from comment mark to real comment
  content = content.replace(COMMENT_RULE, (comment, id) => {
    return comments[id | 0]
  })

  return content
}

module.exports = cssReplace
