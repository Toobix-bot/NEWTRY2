<script lang="ts">
  import { onMount } from 'svelte';
  import { ai } from '../../core/ai';

  let ore = 0;
  let orePerClick = 1;
  let orePerSecond = 0;
  let pickaxeLevel = 1;
  let miners = 0;
  let tip = '';
  let lastTick = performance.now();

  function mine() {
    ore += orePerClick;
  }

  function buyPickaxe() {
    const cost = pickaxeLevel * 10;
    if (ore >= cost) {
      ore -= cost;
      pickaxeLevel += 1;
      orePerClick += 1;
    }
  }

  function hireMiner() {
    const cost = 25 + miners * 25;
    if (ore >= cost) {
      ore -= cost;
      miners += 1;
      recalc();
    }
  }

  function recalc() {
    orePerSecond = miners * 0.5;
  }

  function loop(now: number) {
    const dt = Math.min(1, (now - lastTick) / 1000);
    ore += orePerSecond * dt;
    lastTick = now;
    requestAnimationFrame(loop);
  }

  async function getTip() {
    tip = '…';
    tip = await ai().chat('Gib mir einen kurzen Tipp für Idle-Mining-Strategie.');
  }

  onMount(() => {
    recalc();
    lastTick = performance.now();
    requestAnimationFrame(loop);
  });
</script>

<style>
  .panel { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .card { border: 1px solid #ddd; border-radius: 8px; padding: 12px; }
  button { padding: 8px 12px; }
</style>

<div class="panel">
  <div class="card">
    <h2>Mine</h2>
    <p>Erz: {ore.toFixed(1)}</p>
    <p>Pro Klick: {orePerClick}</p>
    <p>Pro Sekunde: {orePerSecond.toFixed(2)}</p>
    <button on:click={mine}>Abbauen</button>
  </div>
  <div class="card">
    <h2>Upgrades</h2>
    <button on:click={buyPickaxe}>Bessere Spitzhacke (Kosten: {pickaxeLevel * 10})</button>
    <br />
    <button on:click={hireMiner}>Miner anheuern (Kosten: {25 + miners * 25})</button>
  </div>
  <div class="card" style="grid-column: 1 / span 2;">
    <h2>Tipps</h2>
    <button on:click={getTip}>Tipp holen</button>
    <p>{tip}</p>
  </div>
</div>
