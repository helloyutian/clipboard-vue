/*!
 * v-clipboard.js v1.0.0
 * https://github.com/helloyutian/v-clipboard
 * 
 * Licensed © Mr.YT
 */
import ClipboardJS from 'clipboard'

export const copy = {
  bind(el, binding) {
    switch (binding.arg) {
      case 'success':
        el._copySuccess = binding.value
        break;
      case 'error':
        el._copyError = binding.value
        break;
      default:
        el._clipboard = new ClipboardJS(el, {
          text() { return binding.value }
        })
        el._clipboard.on('success', function (e) {
          el._copySuccess && el._copySuccess(e)
        })
        el._clipboard.on('error', function (e) {
          el._copyError && el._copyError(e)
        })
    }
  },
  update(el, binding) {
    switch (binding.arg) {
      case 'success':
        el._copySuccess = binding.value
        break;
      case 'error':
        el._copyError = binding.value
        break;
      default:
        el._clipboard.text = function () { return binding.value }
    }
  },
  unbind(el) {
    el._clipboard && el._clipboard.destroy()
    delete el._clipboard
    delete el._copySuccess
    delete el._copyError
  }
}

export const copyText = (text, container) => {
  return new Promise((resolve, reject) => {
    const btn = document.createElement('button')
    const clipboard = new ClipboardJS(btn, {
      text: function() {
        return text
      },
      container: container || document.body
    })
    clipboard.on('success', function(e) {
      clipboard.destroy()
      resolve(e)
    })
    clipboard.on('error', function(e) {
      clipboard.destroy()
      reject(e)
    })
    document.body.appendChild(btn)
    btn.click()
    document.body.removeChild(btn)
  })
}

export default VClipboard = {
  install(Vue) {
    Vue.prototype.$copyText = copyText
    Vue.directive('copy', copy)
  }
}

if (typeof exports === 'object') {
  module.exports = VClipboard
} else if (typeof define === 'function' && define.amd) {
  define([], function () {
    return VClipboard
  })
} else {
  window.VClipboard = VClipboard
}
