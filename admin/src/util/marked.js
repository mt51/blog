import Marked from 'marked'
import hljs from 'highlight.js'

const renderer = new Marked.Renderer()

Marked.setOptions({
  highlight (code, lang) {
    if (lang) {
      return hljs.highlight(lang, code).value
    } else {
      return hljs.highlightAuto(code).value
    }
  },
  renderer
})

export const marked = text => {
  var tok = Marked.lexer(text)
  text = Marked.parser(tok).replace(/<pre>/ig, '<pre class="hljs">')
  return text
}
