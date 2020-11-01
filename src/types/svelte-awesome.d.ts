/* eslint-disable import/no-default-export */
declare module 'svelte-awesome' {
  import type { IconDefinition } from '@fortawesome/free-regular-svg-icons'

  export default class Icon extends Svelte2TsxComponent<{
    data: IconDefinition
    scale?: number
    spin?: boolean
    inverse?: boolean
    pulse?: boolean
    flip?: 'horizontal'|'vertical'
    label?: string
    // self = null // I think this is used internally only
    style?: string
    class?: string
  }> {}
}
