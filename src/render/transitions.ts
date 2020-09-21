import {cubicOut} from 'svelte/easing'
import type { TransitionConfig} from 'svelte/types/runtime/transition';

type EasingFunction = (t: number) => number;
type Placement =  'top'|'bottom'|'left'|'right'
interface Params {
  delay?: number
  duration?: number
  easing?: EasingFunction
  from?: Placement
}

export function slide(node: Element, {
  delay = 0,
  duration = 400,
  easing = cubicOut,
  from = 'top'
}: Params): TransitionConfig {
  const dirDefChain = (dir:Placement,val:unknown)=>{
    return from===dir ? val : undefined
  }
  const sizeParam = (from==='left'|| from==='right') ? 'width' : 'height'
  const inverseFrom = dirDefChain('top','bottom')
  ?? dirDefChain('bottom','top')
  ?? dirDefChain('left','right')
  ?? dirDefChain('right','left')
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const size = parseFloat(style.getPropertyValue(sizeParam));
  const padding_a = parseFloat(style.getPropertyValue(`padding-${from}`));
  const padding_b = parseFloat(style.getPropertyValue(`padding-${inverseFrom}`));
  const margin_a = parseFloat(style.getPropertyValue(`margin-${from}`));
  const margin_b = parseFloat(style.getPropertyValue(`margin-${inverseFrom}`));
  const border_a_width = parseFloat(style.getPropertyValue(`border-${from}-width`));
  const border_b_width = parseFloat(style.getPropertyValue(`border-${inverseFrom}-width`));

  return {
    delay,
    duration,
    easing,
    css: (t) => {
      return `overflow: hidden;` +
      `opacity: ${Math.min(t * 20, 1) * opacity};` +
      `${sizeParam}: ${t * size}px;` +
      `padding-${from}: ${t * padding_a}px;` +
      `padding-${inverseFrom}: ${t * padding_b}px;` +
      `margin-${from}: ${t * margin_a}px;` +
      `margin-${inverseFrom}: ${t * margin_b}px;` +
      `border-${from}-width: ${t * border_a_width}px;` +
      `border-${inverseFrom}-width: ${t * border_b_width}px;`
    }
  };
}
