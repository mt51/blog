<template>
  <ul class="rs-tree">
    <treeItem v-for="(item,index) in list" :key="item.nodeIndex" :data="item" :isExpand="item.isExpand" @node-click="handleNodeClick"></treeItem>
    <div class="rs-tree-empty" v-if="!list.length">
        暂无数据
    </div>
  </ul>
</template>

<script>
import treeItem from './tree-item'

let key = 1

export default {
  props: {
    list: {
      type: Array,
      default () {
        return {}
      }
    }
  },
  methods: {
    updateData () {
      function initData (data, vm) {
        data.forEach(item => {
          vm.$set(item, 'isExpand', false)
          if (!item.nodeIndex) {
            vm.$set(item, 'nodeIndex', key++)
            if (item.children && item.children.length) {
              initData(item.children, vm)
            }
          }
        })
      }
      initData(this.list, this)
    },
    handleNodeClick (node) {
      this.$emit('node-click', node)
    }
  },
  components: {
    treeItem
  },
  mounted () {
    this.updateData()
  }
}
</script>
