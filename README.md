# clipboard-vue

一个简单的基于`clipboard.js`开发的可以在vue使用的复制文本插件

## 安装

```javasript
npm install --save clipboard-vue
``` 
或者引入

```html
<script lang="javascript" src="dist/clipboard-vue.min.js"></script>
``` 

## 开始使用

全局引入:

```javascript
// main.js
import Vue from 'vue'
import VClipboard from 'clipboard-vue'

Vue.use(VClipboard)
```

组件内按需引入:

```javascript
// component.vue
import { copy, copyText } from 'clipboard-vue'
// copy 复制指令
// copyText 复制函数
export default {
    name: 'ComponentName',
    directives: {
      // 注册指令
      copy
    },
    methods: {
      clickHandle() {
        copyText('copy content').then(e => {
          ...
        }).catch(e => {
          ...
        })
      }
    }
    ...
}
```


单独引入:

```html
<!-- index.html -->
<script src="vue.min.js"></script>
<script src="dist/clipboard-vue.min.js"></script>
<script>
Vue.use(VClipboard)
new Vue({
...
})
</script>
```

## 复制没有特定按钮的文本

您可以使用我们的新方法来做到这一点 this.$copyText。请参阅 [Example](https://helloyutian.github.io/clipboard-vue/example/example_1.html)，其中我们将剪贴板指令替换为v-on指令。

现代浏览器有一些局限性，例如`window.open`没有用户交互就无法使用。因此，复制内容也有相同的限制！在使用前对其进行测试。确保您没有在任何异步方法中使用此方法。

使用此功能之前，请先阅读：[此问题](https://github.com/zenorocha/clipboard.js/issues/218)和[本页](https://github.com/zenorocha/clipboard.js/wiki/Known-Limitations)。


## 在 bootstrap 的 modals 使用失效？

参阅 [clipboardjs](https://clipboardjs.com/#advanced-usage) 文档, 使用`container` 选项如下所示:

```js
let container = this.$refs.container
this.$copyText("Text to copy", container)
```


## 例子 1

```javascript
// main.js
  Vue.use(VClipboard)
  new Vue({
    el: '#app',
    data: function () {
      return {
        message: '复制的内容'
      }
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
  })
```

## 例子 2

```html
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
  import { copy, copyText } from 'clipboard-vue'
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
```

您可以使用 [Vue实例 ```vm.$el```](https://vuejs.org/v2/api/#vm-el) 通过通常的遍历方法来获取DOM元素，例如:

```this.$el.children[1].children[2].textContent```

这将允许您访问组件的渲染内容，而不是组件本身。

### 贡献

欢迎公关，以及问题！如果您想要我们目前没有的任何功能，请针对功能请求提出问题。

