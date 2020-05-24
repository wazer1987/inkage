/* eslint-disable no-cond-assign */
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
    lazyload: {
      type: Function
    },
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
    handle (id, children) {
      // 由于子组件不能更改父组件传递过来的数据 所以要深度拷贝一份
      const cloneOptions = JSON.parse(JSON.stringify(this.options))
      let stack = [...cloneOptions]
      let index = 0
      let current
      // 开始循环 把我们的数组的第零项先拿出来 赋值给我们的当前项
      while ((current = stack[index++])) {
        // 看看当前的项是不是我们点击的那一项 如果不是我们就再把他children放在栈中
        if (current.id !== id) {
          if (current.children) {
            stack = stack.concat(current.children)
          }
        } else {
          // 这里就是找到了
          break
        }
      }
      if (current) {
        // 就把我们当前项目赋值
        current.children = children
        // 然后在更新给父组件
        this.$emit('update:options', cloneOptions)
      }
    },
    // 从组件接收过来的值 然后在向上传递
    change (value) {
      const id = value[value.length - 1].id
      if (this.lazyload) {
        this.lazyload(id, (children) => {
          this.handle(id, children)
        })
      }
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
