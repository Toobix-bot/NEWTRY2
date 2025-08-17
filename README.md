# Spielesammlung (NEWTRY2)

Kleines, ausbaufähiges Web-Projekt (Vite + Svelte, TypeScript). Lokal spielbar und via GitHub Pages veröffentlichbar.

## Entwicklung
- Voraussetzungen: Node.js 18+
- Start:

```powershell
npm install
npm run dev
```

Lokaler Dev-Server: http://localhost:5174/NEWTRY2/

## Build
```powershell
npm run build
npm run preview
```

## GitHub Pages
- Diese Repo hat ein Workflow `.github/workflows/pages.yml`.
- Aktivere in den Repo Settings GitHub Pages und wähle "GitHub Actions" als Source.
 - URL (nach Deploy): https://<dein-github-user>.github.io/NEWTRY2/

## KI-Optionen
- Browser (ohne API): einfache Tipps (Stub), läuft direkt im Browser (keine Keys nötig).
- Ollama lokal: in Dev nutzbar (http://127.0.0.1:11434). Auf GitHub Pages nicht direkt erreichbar (Mixed Content/CORS).

### Ollama Hinweise
- Starte Ollama lokal, z. B. mit `ollama run gemma:2b` (oder anderes kleines Modell).
- Öffne die App lokal (http, z. B. Vite Dev-Server), nicht über GitHub Pages.
- In der UI KI-Modus auf "Ollama (lokal)" stellen.

## Struktur
- `src/core/ai`: KI-Adapter
- `src/core/storage.ts`: Speichern/Export/Import der Spielstände
- `src/games/idle-miner`: Erstes Mini-Spiel
- `src/games/farm`: Zweites Mini-Spiel (Farm Manager)

## Spiele
- Idle Miner: Klicken, Upgrades, passive Einnahmen
- Farm Manager: Pflanzen, wachsen lassen, ernten, verkaufen

## Speichern & Transfer
Im Hub gibt es einen Bereich "Speichern & Transfer":
- Export: schreibt alle Spielstände in eine JSON im Textfeld
- Import: fügt die JSON wieder ein (neuladen danach)
- Reset: löscht alle Spielstände dieser Sammlung

Viel Spaß beim Experimentieren!

