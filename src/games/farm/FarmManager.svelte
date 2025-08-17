<script lang="ts">
  import { onMount } from 'svelte';
  import { ai } from '../../core/ai';
  import { load, save } from '../../core/storage';

  type Plot = { crop: 'Weizen' | null; plantedAt: number | null };
  type State = { coins: number; plots: Plot[]; harvests: number };

  let state: State = load<State>('farm', { coins: 50, plots: Array.from({ length: 6 }, () => ({ crop: null, plantedAt: null })), harvests: 0 });
  const growTime = 20_000; // 20s per crop for MVP
  let tip = '';

  function canPlant(i: number) { return state.plots[i].crop === null && state.coins >= 5; }
  function plant(i: number) {
    if (!canPlant(i)) return;
    state.coins -= 5;
    state.plots[i] = { crop: 'Weizen', plantedAt: Date.now() };
    persist();
  }
  function ready(i: number) {
    const p = state.plots[i];
    if (!p.crop || !p.plantedAt) return false;
    return Date.now() - p.plantedAt >= growTime;
  }
  function harvest(i: number) {
    if (!ready(i)) return;
    state.coins += 12;
    state.harvests += 1;
    state.plots[i] = { crop: null, plantedAt: null };
    persist();
  }
  function persist() { save('farm', state); }

  async function getTip() {
    tip = '…';
    tip = await ai().chat('Kurzer Tipp für Farming-Loop (pflanzen, ernten, verkaufen).');
  }

  let timer: any;
  onMount(() => {
    timer = setInterval(() => { /* trigger reactivity */ state = { ...state }; }, 1000);
    return () => clearInterval(timer);
  });
</script>

<style>
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .card { border: 1px solid #ddd; border-radius: 8px; padding: 12px; }
  .plot { border: 1px dashed #aaa; padding: 16px; text-align: center; border-radius: 6px; }
  button { padding: 6px 10px; }
  .muted { color: #666; font-size: 0.9em; }
  .ready { background: #e9fbe9; }
  .growing { background: #fff8e1; }
</style>

<div class="card">
  <h2>Farm Manager</h2>
  <p>Münzen: {state.coins}</p>
  <div class="grid">
    {#each state.plots as p, i}
      <div class="plot {ready(i) ? 'ready' : p.crop ? 'growing' : ''}">
        {#if p.crop}
          <div>
            <strong>{p.crop}</strong>
            <div class="muted">
              {#if ready(i)}Bereit zur Ernte!{:else}Wächst…{/if}
            </div>
            <button on:click={() => harvest(i)} disabled={!ready(i)}>Ernten (+12)</button>
          </div>
        {:else}
          <button on:click={() => plant(i)} disabled={!canPlant(i)}>Weizen pflanzen (-5)</button>
        {/if}
      </div>
    {/each}
  </div>
  <div class="card" style="margin-top:12px;">
    <h3>Tipps</h3>
    <button on:click={getTip}>Tipp holen</button>
    <p>{tip}</p>
  </div>
</div>
