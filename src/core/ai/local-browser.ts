// Minimaler Browser-AI-Stub ohne externe API
// Ersetzt KI durch einfache Heuristiken/Markov-artige Antworten

export function browserAi() {
  return {
    warmup() {},
    async chat(input: string): Promise<string> {
      const tips = [
        'Upgrade deine Spitzhacke für schnelleren Abbau.',
        'Investiere früh in passive Einnahmen.',
        'Diversifiziere Ressourcen, um Engpässe zu vermeiden.',
        'Kurze Ziele setzen: Nächster Upgrade-Meilenstein!',
      ];
      if (!input) return tips[Math.floor(Math.random() * tips.length)];
      const lower = input.toLowerCase();
      if (lower.includes('upgrade')) return 'Priorisiere Upgrades, die die Produktion pro Sekunde erhöhen.';
      if (lower.includes('farm')) return 'Pflanze früh, ernte regelmäßig, reinvestiere Gewinne.';
      if (lower.includes('strategie')) return 'Baue Engpässe ab und halte immer etwas Reserve an Kernressourcen.';
      return tips[Math.floor(Math.random() * tips.length)];
    },
  };
}
