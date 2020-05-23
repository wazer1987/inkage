<template>
  <div class="content">
    <div class="content-left">
        <div class="label" v-for="(item,index) in options" :key="index" @click="select(item)">
            {{item.label}}
        </div>
    </div>
    <div class="content-right" v-if="lists && lists.length">
       <Cascader-item :options="lists" :level="level+1" @change="change" :value="value"></Cascader-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CascaderItem',
  props: {
    level: {
      type: Number
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
      currentSelected: null
    }
  },
  computed: {
    lists () {
      return this.value[this.level] && this.value[this.level].children
    }
  },
  methods: {
    change (item) {
      this.$emit('change', item)
    },
    select (item) {
      this.currentSelected = item
      // 因为子组件不能改变父组件的值 所以我们需要深拷贝一下
      const cloneValue = JSON.parse(JSON.stringify(this.value))
      // 当点击的第二级别的时候删除自己下一级别的所有数据
      cloneValue.splice(this.level)
      // 这里我们的level是每次都会加一的 然后让我们数组的每一位对应数据每一级的值
      cloneValue[this.level] = item
      // 选择好的值以后 我们需要向上传递
      this.$emit('change', cloneValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
    display: flex;
}
.content-left{
    border: 1px solid #ccc;
    width: 40px;
    padding: 8px;
    .label:hover{
        background: #ccc;
        cursor: pointer;
    }
}
</style>
