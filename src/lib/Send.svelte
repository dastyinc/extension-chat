<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import Message from "./Message.svelte";
    import {Input} from "nunui";

    const dispatch = createEventDispatcher();
    export let id;

    let input, body;

    function submit(e) {
        if (body !== "") {
            dispatch('submit', body);
            body = "";
        }
    }
</script>

<div class="anim">
    <Message message={{id, body}} {id}/>
</div>
<main>
    <Input bind:this={input} type="text" maxlength="20" fullWidth placeholder="내용" bind:value={body}
           on:submit={submit} autofocus/>
</main>

<style lang="scss">
  @import "nunui/Style";

  main {
    display: flex;
    flex-direction: row;
    align-items: center;

    & > :global(*) {
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .input {
    position: relative;
    display: inline-block;
    flex: 1;
    top: -16px;
    width: 100%;
  }

  .anim {
    opacity: 0;
    pointer-events: none;
    position: absolute;

    & > :global(*) {
      @include full;
    }
  }
</style>
