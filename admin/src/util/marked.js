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
  const reg = /^[-]{3}([\s\S]*)[-]{3}$/
  const result = md.match(reg)
  let title, tags, category, mdcont
  console.log('第一个结果', result)
  if (result && result[1]) {
    title = getBykey('title', result[1])
    tags = getBykey('tags', result[1])
    category = getBykey('category', result[1])
    mdcont = md.replace(result[0], `### ${title}`)
  }
  return {
    title,
    tags,
    category,
    mdcont: mdcont || ''
  }
}

function getBykey (key, str) {
  str = str.replace(/^\s/, '')
  const reg = new RegExp(`^\\s+|${key}:([\\s\\S]*)\n$`, 'g')
  const result = str.match(reg)
  console.log('第二个结果:', result)
  if (result && result[1]) {
    return result[1]
  } else {
    return ''
  }
}
