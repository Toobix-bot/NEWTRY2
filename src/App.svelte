<script lang="ts">
  import { onMount } from 'svelte';
  import { games } from './games';
  import { setAiMode, ai } from './core/ai';
  import type { AiMode } from './core/ai';

  let currentGameId: string | null = null;

  function startGame(id: string) {
    currentGameId = id;
  }

  function backToHub() {
    currentGameId = null;
  }

  let mode: AiMode = 'browser';
  $: setAiMode(mode);

  onMount(() => {
    // try initializing AI in background
    ai().warmup?.();
  });
</script>

<style>
  :global(body) { font-family: system-ui, sans-serif; }
  .container { max-width: 960px; margin: 0 auto; padding: 16px; }
  header { display: flex; justify-content: space-between; align-items: center; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
  .card { border: 1px solid #ddd; border-radius: 8px; padding: 12px; }
</style>

<div class="container">
  <header>
    <h1>Spielesammlung</h1>
    <div>
      <label for="ai-mode">KI: </label>
      <select id="ai-mode" bind:value={mode}>
        <option value="off">Aus</option>
        <option value="browser">Browser</option>
        <option value="ollama">Ollama (lokal)</option>
      </select>
    </div>
  </header>

  {#if !currentGameId}
    <h2>Spiele</h2>
    <div class="grid">
      {#each games as g}
        <div class="card">
          <h3>{g.name}</h3>
          <p>{g.description}</p>
          <button on:click={() => startGame(g.id)}>Start</button>
        </div>
      {/each}
    </div>
  {:else}
    {#each games as g}
      {#if g.id === currentGameId}
        <div>
          <button on:click={backToHub}>Zurück</button>
          <svelte:component this={g.Component} />
        </div>
      {/if}
    {/each}
  {/if}
</div>
