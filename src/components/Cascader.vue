<template>
  <div class="cascader" v-click-outside="close">
    <div class="title" @click="toggle">
      {{result}}
    </div>
    <div v-if="isVisbel">
        <Cascader-item :options="options" :value="value" :level="0" @change="change"></Cascader-item>
    </div>
  </div>
</template>

<script>
import clickOutside from './clickOutside'
import CascaderItem from './CascaderItem'
export default {
  components: {
    CascaderItem
  },
  directives: {
    clickOutside
  },
  computed: {
    result () {
      return this.value.map(item => item.label).join('/')
    }
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
    // 用来存放我们文本框显示的值

      isVisbel: false

    }
  },

  methods: {
    // 从组件接收过来的值 然后在向上传递
    change (value) {
      this.$emit('input', value)
    },
    // 点击外面的时候关闭显示内容
    close () {
      this.isVisbel = false
    },
    // 切换隐藏于显示
    toggle () {
      this.isVisbel = !this.isVisbel
    }
  }
}
</script>

<style lang="scss" scoped>
.cascader{
    display: inline-block;
}
.title{
    width: 150px;
    height: 30px;
    border: 1px solid #ccc;
}

</style>
