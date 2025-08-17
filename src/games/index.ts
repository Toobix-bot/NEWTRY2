import IdleMiner from './idle-miner/IdleMiner.svelte';

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
];
