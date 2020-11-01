import { cubicOut } from 'svelte/easing'
// eslint-disable-next-line import/no-unresolved
import type { TransitionConfig } from 'svelte/types/runtime/transition'

type EasingFunction = (t: number) => number
type Placement = 'top'|'bottom'|'left'|'right'
interface Params {
  delay?: number
  duration?: number
  easing?: EasingFunction
  from?: Placement
}

export function slide(node: Element ,{
  delay = 0
  ,duration = 400
  ,easing = cubicOut
  ,from = 'top'
}: Params): TransitionConfig {
  const dirDefChain = (dir:Placement ,val:string):string|undefined => (from === dir ? val : undefined)
  const sizeParam = (from === 'left' || from === 'right') ? 'width' : 'height'
  const inverseFrom = dirDefChain('top' ,'bottom')
  ?? dirDefChain('bottom' ,'top')
  ?? dirDefChain('left' ,'right')
  ?? dirDefChain('right' ,'left') as string
  const style = getComputedStyle(node)
  const opacity = +style.opacity
  const size = parseFloat(style.getPropertyValue(sizeParam))
  const paddingA = parseFloat(style.getPropertyValue(`padding-${from}`))
  const paddingB = parseFloat(style.getPropertyValue(`padding-${inverseFrom}`))
  const marginA = parseFloat(style.getPropertyValue(`margin-${from}`))
  const marginB = parseFloat(style.getPropertyValue(`margin-${inverseFrom}`))
  const borderWidthA = parseFloat(style.getPropertyValue(`border-${from}-width`))
  const borderWidthB = parseFloat(style.getPropertyValue(`border-${inverseFrom}-width`))
  return {
    delay
    ,duration
    ,easing
    ,css: (t) => 'overflow: hidden;'
      + `opacity: ${Math.min(t * 20 ,1) * opacity};`
      + `${sizeParam}: ${t * size}px;`
      + `padding-${from}: ${t * paddingA}px;`
      + `padding-${inverseFrom}: ${t * paddingB}px;`
      + `margin-${from}: ${t * marginA}px;`
      + `margin-${inverseFrom}: ${t * marginB}px;`
      + `border-${from}-width: ${t * borderWidthA}px;`
      + `border-${inverseFrom}-width: ${t * borderWidthB}px;`
  }
}
