<script lang="ts">
  import { onMount } from 'svelte';
  import { games } from './games';
  import { setAiMode, ai, getAiConfig, setAiConfig } from './core/ai';
  import type { AiMode } from './core/ai';
  import Overview from './Overview.svelte';
  import { exportAll, importAll, clearAll } from './core/storage';

  let currentGameId: string | null = null;

  function startGame(id: string) {
    currentGameId = id;
  }

  function backToHub() {
    currentGameId = null;
  }

  let mode: AiMode = 'browser';
  $: setAiMode(mode);
  let host = getAiConfig().host;
  let model = getAiConfig().model;
  $: setAiConfig({ host, model });

  let diag = '';
  async function pingOllama() {
    diag = 'Prüfe…';
    try {
      const r = await fetch(`${host}/api/tags`, { method: 'GET' });
      diag = r.ok ? 'Ollama erreichbar.' : `HTTP ${r.status}`;
    } catch (e) {
      diag = 'Nicht erreichbar.';
    }
  }

  onMount(() => {
    if (location.protocol === 'https:' && mode === 'ollama') {
      mode = 'browser';
    }
    // try initializing AI in background
    ai().warmup?.();
  });

  // Export/Import helpers
  let exportText = '';
  function doExport() { exportText = exportAll(); }
  function doImport() { if (exportText?.trim()) { importAll(exportText); location.reload(); } }
  function doClear() { if (confirm('Alle Spielstände dieser Sammlung löschen?')) { clearAll(); location.reload(); } }
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

  <div class="card" style="margin:12px 0;">
    <strong>KI-Einstellungen</strong>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;align-items:end;">
      <label>Host
        <input type="text" bind:value={host} placeholder="http://127.0.0.1:11434" />
      </label>
      <label>Modell
        <input type="text" bind:value={model} placeholder="gemma3:1b" />
      </label>
      <div>
        <button on:click={pingOllama}>Diagnose</button>
        <span style="margin-left:8px;">{diag}</span>
      </div>
    </div>
    {#if location.protocol === 'https:'}
      <div style="margin-top:8px;color:#a00;">
        Hinweis: Auf GitHub Pages (HTTPS) kann Ollama (HTTP) nicht direkt angesprochen werden.
        Öffne die App lokal: <a href="http://localhost:5174/NEWTRY2/" target="_blank" rel="noopener">http://localhost:5174/NEWTRY2/</a>
      </div>
    {/if}
  </div>

  <div class="card" style="margin:12px 0;">
    <strong>Speichern & Transfer</strong>
    <div style="display:grid;grid-template-columns:1fr auto auto auto;gap:8px;align-items:start;">
      <textarea bind:value={exportText} placeholder="Exportierte Daten…" rows="4"></textarea>
      <button on:click={doExport}>Export</button>
      <button on:click={doImport} disabled={!exportText.trim()}>Import</button>
      <button on:click={doClear}>Reset</button>
    </div>
  </div>

  {#if !currentGameId}
  <Overview />
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
        <div class="card" style="margin-bottom:12px;">
          <button on:click={backToHub}>&larr; Zurück</button>
          <strong style="margin-left:8px;">{g.name}</strong>
        </div>
        <svelte:component this={g.Component} />
      {/if}
    {/each}
  {/if}
</div>
