<script lang="ts">
  import { onMount } from 'svelte';
  import { ai } from '../../core/ai';
  import { load, save } from '../../core/storage';

  type IMState = { ore: number; orePerClick: number; orePerSecond: number; pickaxeLevel: number; miners: number };
  let state: IMState = load<IMState>('idle', { ore: 0, orePerClick: 1, orePerSecond: 0, pickaxeLevel: 1, miners: 0 });
  let { ore, orePerClick, orePerSecond, pickaxeLevel, miners } = state;
  let tip = '';
  let lastTick = performance.now();

  function persist() {
    save('idle', { ore, orePerClick, orePerSecond, pickaxeLevel, miners });
  }

  function mine() {
  ore += orePerClick;
  persist();
  }

  function buyPickaxe() {
    const cost = pickaxeLevel * 10;
    if (ore >= cost) {
      ore -= cost;
      pickaxeLevel += 1;
      orePerClick += 1;
  persist();
    }
  }

  function hireMiner() {
    const cost = 25 + miners * 25;
    if (ore >= cost) {
      ore -= cost;
      miners += 1;
      recalc();
  persist();
    }
  }

  function recalc() {
    orePerSecond = miners * 0.5;
  persist();
  }

  function loop(now: number) {
    const dt = Math.min(1, (now - lastTick) / 1000);
    ore += orePerSecond * dt;
    lastTick = now;
  // save occasionally
  if (Math.random() < 0.1) persist();
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
