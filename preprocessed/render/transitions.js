import { cubicOut } from 'svelte/easing';
export function slide(node, { delay = 0, duration = 400, easing = cubicOut, from = 'top' }) {
    const dirDefChain = (dir, val) => (from === dir ? val : undefined);
    const sizeParam = (from === 'left' || from === 'right') ? 'width' : 'height';
    const inverseFrom = dirDefChain('top', 'bottom')
        ?? dirDefChain('bottom', 'top')
        ?? dirDefChain('left', 'right')
        ?? dirDefChain('right', 'left');
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const size = parseFloat(style.getPropertyValue(sizeParam));
    const paddingA = parseFloat(style.getPropertyValue(`padding-${from}`));
    const paddingB = parseFloat(style.getPropertyValue(`padding-${inverseFrom}`));
    const marginA = parseFloat(style.getPropertyValue(`margin-${from}`));
    const marginB = parseFloat(style.getPropertyValue(`margin-${inverseFrom}`));
    const borderWidthA = parseFloat(style.getPropertyValue(`border-${from}-width`));
    const borderWidthB = parseFloat(style.getPropertyValue(`border-${inverseFrom}-width`));
    return {
        delay,
        duration,
        easing,
        css: (t) => 'overflow: hidden;'
            + `opacity: ${Math.min(t * 20, 1) * opacity};`
            + `${sizeParam}: ${t * size}px;`
            + `padding-${from}: ${t * paddingA}px;`
            + `padding-${inverseFrom}: ${t * paddingB}px;`
            + `margin-${from}: ${t * marginA}px;`
            + `margin-${inverseFrom}: ${t * marginB}px;`
            + `border-${from}-width: ${t * borderWidthA}px;`
            + `border-${inverseFrom}-width: ${t * borderWidthB}px;`
    };
}
//# sourceMappingURL=transitions.js.map