import type { TransitionConfig } from 'svelte/types/runtime/transition';
declare type EasingFunction = (t: number) => number;
declare type Placement = 'top' | 'bottom' | 'left' | 'right';
interface Params {
    delay?: number;
    duration?: number;
    easing?: EasingFunction;
    from?: Placement;
}
export declare function slide(node: Element, { delay, duration, easing, from }: Params): TransitionConfig;
export {};
