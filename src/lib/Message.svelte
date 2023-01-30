<script lang="ts">
    import {cubicOut} from "svelte/easing";
    import {receive, send} from "./crossfade";
    import AccountProvider from "./AccountProvider.svelte";

    export let id, channel, user, body, timestamp, me;

    function chatAnim(node: HTMLElement, {delay = 0, duration = 200, easing = cubicOut} = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: (t) => `opacity: ${t * o};transform: scale(${0.1 * t + 0.9}) translateY(${10 * (1 - t)}px);`
        };
    }
</script>

{#key '_' + id}
    <main class:me in:receive={{key: '_' + id}} out:send={{key: '_' + id}}>
        {#if user && !me}
            <AccountProvider id={user} let:account>
                <b>{account.loaded ? account.user?.user_name : '로드 중...'}</b>
            </AccountProvider>
        {:else if me}
            <b>나</b>
        {:else}
            <b>공지</b>
        {/if}
        <p>{body}</p>
    </main>
{/key}

<style lang="scss">
  main {
    background-color: #00000066;
    width: calc(70% - 24px);
    padding: 4px;
    margin: 8px;
    border-radius: 12px;

    &.me {
      background-color: #ffffff66;
      margin-left: 30%;
    }

    p {
      margin: 0;
    }
  }
</style>
