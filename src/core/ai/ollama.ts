// Sehr einfacher Ollama-Client (lokal). Funktioniert nur im Local Dev/HTTP oder Desktop, nicht auf GitHub Pages (HTTPS).

export function ollamaAi(opts?: { host?: string; model?: string }) {
  const host = opts?.host ?? 'http://127.0.0.1:11434';
  const model = opts?.model ?? 'gemma:2b';
  return {
    async chat(input: string): Promise<string> {
      try {
        const res = await fetch(`${host}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model, prompt: input, stream: false })
        });
        if (!res.ok) throw new Error('Ollama HTTP ' + res.status);
        const data = await res.json();
        return data.response ?? '[Keine Antwort]';
      } catch (e: any) {
        return `Ollama nicht erreichbar (${e?.message}). Wechsle zu Browser-KI.`;
      }
    },
  };
}
