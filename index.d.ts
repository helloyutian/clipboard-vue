declare module 'v-clipboard' {
  import Vue, { PluginFunction, DirectiveOptions } from 'vue'
  type clipboardFunction = (text: string, container?: object | HTMLElement) => Promise<{
    action: string,
    text: string,
    trigger: String | HTMLElement | HTMLCollection | NodeList,
    clearSelection: () => void
  }>;

  module "vue/types/vue" {
    interface Vue {
      $copyText: clipboardFunction
    }
  }
  
  export const copy: DirectiveOptions
  export const copyText: clipboardFunction
  export class VClipboard {
    static install: PluginFunction<never>
  }
}
