declare module 'clipboard-vue' {
  import Vue, { PluginFunction, DirectiveOptions } from 'vue'
  interface ClipboardFunction {
    (text: string, container?: object | HTMLElement): Promise<{
      action: string;
      text: string;
      trigger: string | HTMLElement | HTMLCollection | NodeList;
      clearSelection: () => void;
    }>
  }

  module "vue/types/vue" {
    interface Vue {
      $copyText: ClipboardFunction
    }
  }
  const VClipboard: {
    install: PluginFunction<never>
  }
  export const copy: DirectiveOptions
  export const copyText: ClipboardFunction
  export default VClipboard
}
