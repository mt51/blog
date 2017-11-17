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
      <div v-if="preview" class="preview markdown-body" v-html="compileMarkdown"></div>
    </div>
    <Modal title="上传图片" v-model="modalVisible">
      <Upload ref="upload" multiple type="drag" name="file" action="//upload.qiniu.com/" :before-upload="beforeUpload" :on-success="handleSuccess" :data="form">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或拖拽文件到此处</p>
        </div>
      </Upload>
    </Modal>
    <Modal title="图片路径" v-model="pathModel" :mask-closable="false">
      <Input v-model="path" id="path"></Input>
    </Modal>
  </div>
</template>
<script>
  import { marked, splitMarkdown } from '@/util/marked'
  const BASE_URL = '//ozft0883x.bkt.clouddn.com/'
  export default {
    name: 'markdown',
    data () {
      return {
        preview: true,
        modalVisible: false,
        full: false,
        form: {
          token: ''
        },
        path: '',
        pathModel: false
      }
    },
    props: ['value'],
    computed: {
      compileMarkdown () {
        const result = splitMarkdown(this.value)
        console.log(result)
        return marked(result.mdcont)
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
        this.preInputText(' ')
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
        this.preInputText('```\n\tcode block\n```', 4, 15)
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
            console.log('链接')
            break
          }
          case '5-2': {
            this.modalVisible = true
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
      beforeUpload (file) {
        return this.axios.get('/api/qiniu/token')
          .then(response => {
            this.form.token = response.data.data.token
            this.form.key = response.data.data.key
          })
      },
      handleSuccess (response) {
        this.modalVisible = false
        this.$refs.upload.clearFiles()
        this.pathModel = true
        this.path = `![图片](${BASE_URL}${response.key})`
      },
      getData () {
        const result = splitMarkdown(this.value)
        result.htmlcont = this.compileMarkdown
        result.origin = this.value
        console.log(result)
        return result
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import url(../../assets/markdown.css);
  @import url(../../../node_modules/highlight.js/styles/github.css);
  .markdown {
    background: #fff;
    z-index: 9;
    position: relative;
    box-shadow: 0 0 1px #ccc;
    .ivu-menu-light {
      background: #f5f5f5;
    }
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
        background: #f9f9f9;
        border: none;
        border-right: 1px solid #ccc;
      }
      .preview {
        width: 100%;
        height: 100%;
        padding: 10px;
        line-height: 1.5;
        font-size: 16px;
        background: #eee;
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