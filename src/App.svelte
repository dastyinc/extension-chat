<script lang="ts">
    import {getContext, onMount, tick} from "svelte";
    import Message from "$lib/Message.svelte";
    import Send from "$lib/Send.svelte";

    const {ws, wsStore} = getContext('utils');
    const channel = getContext('channel');

    let chatBox, messages = [], sendWs, curr = -1;

    function gotoBottom() {
        if (!chatBox) return;
        setTimeout(() => {
            chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight + 18;
        }, 100);
    }

    $: if (messages.length > 1) gotoBottom();

    onMount(() => ws(channel).conn(({message, uid, send}) => {
        sendWs = send;
        wsStore(message, 'CHAT').subscribe(async ({id: user, message, time}) => {
            curr++;
            if (user !== uid) await tick();
            messages = [...messages, {
                id: messages.length,
                channel: channel,
                user,
                body: message,
                timestamp: time,
                me: user === uid,
            }];
        });
    }));
</script>

<div class="title">Chat</div>
<div class="chat --scroll" bind:this={chatBox}>
    {#each messages as m, i}
        <Message {...m}/>
    {/each}
</div>

<Send on:submit={({detail: message}) => sendWs('CHAT', {message})} id={curr}/>

<style lang="scss">
  .title {
    font-size: 1.5rem;
    font-weight: 500;
  }

  .chat {
    max-height: 400px;
    overflow-y: auto;
    scroll-behavior: smooth;
  }
</style>