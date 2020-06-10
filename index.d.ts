declare module 'clipboard-vue' {
  import Vue, { PluginFunction, DirectiveOptions } from 'vue'
  type clipboardFunction = (text: string, container?: object | HTMLElement) => Promise<{
    action: string;
    text: string;
    trigger: string | HTMLElement | HTMLCollection | NodeList;
    clearSelection: () => void;
  }>

  module "vue/types/vue" {
    interface Vue {
      $copyText: clipboardFunction
    }
  }
  class VClipboard {
    static install: PluginFunction<never>
  }
  export const copy: DirectiveOptions
  export const copyText: clipboardFunction
  export default VClipboard
}
