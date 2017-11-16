<template>
  <div class="markdown" :class="{'full-screen': full}" @keyup.esc="escFull">
    <div class="tool">
      <Menu mode="horizontal" @on-select="handleSelect">
        <MenuItem name="1">加粗</MenuItem>
        <MenuItem name="2">斜体</MenuItem>
        <MenuItem name="3">引用</MenuItem>
        <MenuItem name="4">代码段</MenuItem>
        <Submenu name="5">
          <template slot="title">插入图片</template>
          <MenuItem name="5-1">网络图片</MenuItem>
          <MenuItem name="5-2">上传图片</MenuItem>
        </Submenu>
        <MenuItem name="6">摘要</MenuItem>
        <MenuItem name="7">预览</MenuItem>
        <MenuItem name="8">全屏</MenuItem>
      </Menu>
    </div>
    <div class="md-editor">
      <textarea :value="value" ref="markdown" @input="handleInput" @keydown.tab.prevent="handleTab"></textarea>
      <div v-if="preview" class="preview" v-html="compileMarkdown"></div>
    </div>
    <Modal title="上传图片" v-model="modalVisible" @on-ok="handleOk">
      <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/" >
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
        </div>
      </Upload>
    </Modal>
  </div>
</template>
<script>
  import { marked } from '@/util/marked'
  export default {
    name: 'markdown',
    data () {
      return {
        preview: true,
        modalVisible: false,
        full: false
      }
    },
    props: ['value'],
    computed: {
      compileMarkdown () {
        return marked(this.value)
      }
    },
    methods: {
      escFull () {
        this.full = false
      },
      handleInput (e) {
        let value = e.target.value
        this.$emit('input', value)
      },
      handleTab (e) {
        this.preInputText('\t')
        e.preventDefault()
      },
      preInputText (text, preStart, preEnd) {
        let textControl = this.$refs.markdown
        const start = textControl.selectionStart
        const end = textControl.selectionEnd
        const origin = this.value
        if (origin && start !== end) {
          const exist = origin.slice(start, end)
          text = text.slice(0, preStart) + exist + text.slice(preEnd)
          preEnd = preStart + exist.length
        }
        let input = origin.slice(0, start) + text + origin.slice(end)

        this.$emit('input', input)
      },
      boldText () {
        this.preInputText('**加粗文字**', 2, 6)
      },
      italicText () {
        this.preInputText('_斜体文字_', 1, 5)
      },
      blockquoteText () {
        this.preInputText('> 引用', 2, 4)
      },
      codeText () {
        this.preInputText('```\ncode block\n```', 5, 15)
      },
      insertMore () {
        this.preInputText('<!--more-->', 12, 12)
      },
      handleSelect (key) {
        switch (key) {
          case '1': {
            this.boldText()
            break
          }
          case '2': {
            this.italicText()
            break
          }
          case '3': {
            this.blockquoteText()
            break
          }
          case '4': {
            this.codeText()
            break
          }
          case '5-1': {
            this.boldText()
            break
          }
          case '5-2': {
            this.boldText()
            break
          }
          case '6': {
            this.insertMore()
            break
          }
          case '7': {
            this.preview = !this.preview
            break
          }
          case '8': {
            this.full = true
            this.$refs.markdown.focus()
            break
          }
        }
      },
      beforeUpload () {
        console.log(123)
      },
      handleOk () {}
    }
  }
</script>
<style lang="scss" scoped>
  .markdown {
    background: #fff;
    .md-editor{
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      height: calc(100vh - 252px);
      textarea {
        width: 100%;
        height: 100%;
        padding: 10px;
        line-height: 1.5;
        font-size: 16px;
      }
      .preview {
        width: 100%;
        height: 100%;
        padding: 10px;
        line-height: 1.5;
        font-size: 16px;
      }
    }
    &.full-screen {
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 9999;
      top: 0;
      left: 0;
      .md-editor {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>