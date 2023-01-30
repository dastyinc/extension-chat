import {crossfade} from 'svelte/transition';
import {quintOut} from "svelte/easing";

const [send, receive] = crossfade({
    duration: d => 600,

    fallback(node, params) {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        const o = +getComputedStyle(node).opacity;

        return {
            duration: 600,
            easing: quintOut,
            css: t => `
					opacity: ${t * o};transform: scale(${0.1 * t + 0.9}) translateY(${10 * (1 - t)}px);
				`
        };
    }
});
export {send, receive};
