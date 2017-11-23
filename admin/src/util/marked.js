import Marked from 'marked'
import hljs from 'highlight.js'

const renderer = new Marked.Renderer()

Marked.setOptions({
  highlight (code, lang) {
    return hljs.highlightAuto(code).value
  },
  renderer
})

export const marked = text => {
  var tok = Marked.lexer(text)
  text = Marked.parser(tok).replace(/<pre>/ig, '<pre class="hljs">')
  return text
}

export const splitMarkdown = md => {
  const reg = /^[-]{3}([\s\S]*)[-]{3}/
  const result = md.match(reg)
  let title, tags, category, mdcont, description
  if (result && result[1]) {
    title = getBykey('title', result[1])
    tags = getBykey('tags', result[1])
    category = getBykey('category', result[1])
    mdcont = md.replace(result[0], `### ${title}`)
    if (mdcont) {
      description = getDescription(mdcont, title)
    }
  }
  return {
    title,
    tags,
    category,
    mdcont: mdcont || '',
    description: description || ''
  }
}

function getBykey (key, str) {
  str = str.replace(/(^\s*)|(\s*$)/g, '')
  const reg = new RegExp(`${key}:([^\\r\\n]+)`)
  const result = str.match(reg)
  if (result && result[2]) {
    return result[2].replace(/(^\s*)|(\s*$)/g, '')
  } else {
    return ''
  }
}

const getDescription = (md, title) => {
  md = md.replace(`### ${title}`, '')
  const mdcont = md.split('<!-- more -->')
  if (md.length > 1) {
    return mdcont[0].replace(/^[\s]|[\s$]/g, '')
  } else {
    return null
  }
}
