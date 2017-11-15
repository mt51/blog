<template>
  <div class="markdown">
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
        <MenuItem name="6">预览</MenuItem>
        <MenuItem name="7">全屏</MenuItem>
      </Menu>
    </div>
    <div class="md-editor">
      <textarea :value="value" ref="markdown" @input="handleInput"></textarea>
      <div class="preview" v-html=""></div>
    </div>
    <Modal title="上传图片" v-model="modalVisible" @on-ok="handleOk">
      <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/" before-upload="beforeUpload">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
        </div>
      </Upload>
    </Modal>
  </div>
</template>
<script>
  import { marked } from 'marked'
  export default {
    name: 'markdown',
    data () {
      return {
        preview: '',
        modalVisible: false
      }
    },
    props: ['value'],
    computed: {
      compileMarkdown () {
        return marked(this.value)
      }
    },
    methods: {
      handleInput (e) {
        let value = e.target.value
        this.$emit('change', value)
      },
      preInputText (text, preStart, preEnd) {
        let textControl = this.$refs.markdown
        const start = textControl.selectionSstart
        const end = textControl.selectionEnd
        const origin = this.value
        if (start !== end) {
          const exist = origin(start, end)
          text = text.slice(0, preStart) + exist + text.slice(preEnd)
          preEnd = preStart + exist.length
        }
        let input = origin.slice(0, start) + text + origin.slice(end)

        this.$emit('input', input)
      },
      boldText () {
        this.preInputText('**加粗文字**', 2, 6)
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
            this.boldText()
            break
          }
          case '7': {
            this.boldText()
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
    .md-editor{
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      height: calc(100vh - 252px);
      textarea {
        width: 100%;
        height: 100%;
      }
      .preview {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>