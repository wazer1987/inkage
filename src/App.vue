<template>
  <div id="app">
    <!-- <div>{{this.options}}</div> -->
    <Cascader :options.sync="options" v-model="value" :lazyload="lazyload"></Cascader>
  </div>
</template>

<script>
import cityList from './data.json'
import Cascader from './components/Cascader'
const citryfilter = (pid) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cityList.filter(item => item.pid === pid))
    }, 1000)
  })
}
export default {
  name: 'App',
  components: {
    Cascader
  },
  async mounted () {
    this.options = await citryfilter('0')
  },
  data () {
    return {
      value: [],
      options: [

      ],
      currentItem: null
    }
  },
  methods: {
    // async input (value) {
    //   const currentItem = value[value.length - 1]
    //   const children = await citryfilter(currentItem.id)
    //   this.$set(currentItem, 'children', children)
    // }
    // 这里我们传进去一个函数 为了能在组件内部调用外面的这个函数 然后通过回调的形式把我查出来的孩子在通过回调传入进去
    // 有了孩子在去更新视图
    async lazyload (id, callback) {
      const children = await citryfilter(id)
      callback(children)
    }
  }
}
</script>

<style lang="scss">

</style>
