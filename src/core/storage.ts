// Simple namespaced localStorage-based persistence with export/import

const NS = 'sg:'; // Spielesammlung namespace

export function save<T>(key: string, value: T) {
  try {
    localStorage.setItem(NS + key, JSON.stringify(value));
  } catch {}
}

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(NS + key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function remove(key: string) {
  try { localStorage.removeItem(NS + key); } catch {}
}

export function exportAll(): string {
  const out: Record<string, unknown> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)!;
      if (!k.startsWith(NS)) continue;
      try { out[k.slice(NS.length)] = JSON.parse(localStorage.getItem(k) || 'null'); } catch {}
    }
  } catch {}
  return JSON.stringify({ version: 1, data: out }, null, 2);
}

export function importAll(json: string) {
  const obj = JSON.parse(json);
  if (!obj || typeof obj !== 'object' || !obj.data) return;
  const data = obj.data as Record<string, unknown>;
  for (const [k, v] of Object.entries(data)) {
    try { localStorage.setItem(NS + k, JSON.stringify(v)); } catch {}
  }
}

export function clearAll() {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)!;
    if (k.startsWith(NS)) keys.push(k);
  }
  keys.forEach(k => localStorage.removeItem(k));
}
