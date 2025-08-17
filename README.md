# Spielesammlung (NEWTRY2)

Kleines, ausbaufähiges Web-Projekt (Vite + Svelte, TypeScript). Lokal spielbar und via GitHub Pages veröffentlichbar.

## Entwicklung
- Voraussetzungen: Node.js 18+
- Start:

```powershell
npm install
npm run dev
```

Lokaler Dev-Server: http://localhost:5173

## Build
```powershell
npm run build
npm run preview
```

## GitHub Pages
- Diese Repo hat ein Workflow `.github/workflows/pages.yml`.
- Aktivere in den Repo Settings GitHub Pages und wähle "GitHub Actions" als Source.

## KI-Optionen
- Browser (ohne API): einfache Tipps (Stub).
- Ollama lokal: in Dev nutzbar (http://127.0.0.1:11434). Auf Pages wegen HTTPS/HTTP nicht direkt.

## Struktur
- `src/core/ai`: KI-Adapter
- `src/games/idle-miner`: Erstes Mini-Spiel

Viel Spaß beim Experimentieren!
Viel Spaß beim Experimentieren!# NEWTRY2

