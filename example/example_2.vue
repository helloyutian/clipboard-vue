<template>
    <div class="container">
      <input type="text" v-model="message">
      <button type="button" v-copy="message" v-copy:success="copySuccess" v-copy:error="copyError">使用指令复制!</button>
      <!-- 剪切的变相实现 -->
      <button type="button" v-copy="message" v-copy:success="cutSuccess">剪切!</button>
      <button type="button" @click="copyFuction(message)">使用copyText复制</button>
    </div>
</template>
<script>
  // 组件内使用
  import { copy, copyText } from 'v-clipboard'
  export default {
    name: 'Example',
    data() {
      return {
        message: 'Copy These Text'
      }
    },
    directives: {
      copy
    },
    methods: {
      // 使用 v-copy 指令复制
      copySuccess() {
      // 复制成功回调
        console.log('copy success')
      },
      copyError() {
      // 复制失败回调
        console.log('copy error')
      },
      
      // cut 剪切的实现
      cutSuccess() {
        this.message = ''
        console.log('cut success')
      },
      
      // 使用函数的方式复制
      copyFuction(text) {
        this.$copyText(text).then(e => {
        // 复制成功
          console.log('copy succ!')
        }).catch(e => {
        // 复制失败
          console.log('copy err!')
        })
      }
    }
  }
</script>
