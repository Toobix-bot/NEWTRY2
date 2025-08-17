import IdleMiner from './idle-miner/IdleMiner.svelte';
import FarmManager from './farm/FarmManager.svelte';

export type GameMeta = {
  id: string;
  name: string;
  description: string;
  Component: any;
};

export const games: GameMeta[] = [
  {
    id: 'idle-miner',
    name: 'Idle Miner',
    description: 'Baue Ressourcen ab, kaufe Upgrades, sammle Stardust.',
    Component: IdleMiner,
  },
  {
    id: 'farm',
    name: 'Farm Manager',
    description: 'Pflanzen, wachsen lassen, ernten und verkaufen.',
    Component: FarmManager,
  },
];
