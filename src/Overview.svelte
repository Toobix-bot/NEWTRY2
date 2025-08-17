<script lang="ts">
  let commits: any[] = [];
  let files: string[] = [];
  let loading = false;
  let summary = '';

  const owner = 'Toobix-bot';
  const repo = 'NEWTRY2';

  async function loadInfo() {
    loading = true;
    try {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=5`);
      commits = await res.json();
      const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`);
      const tree = await treeRes.json();
      files = (tree.tree ?? []).filter((t: any) => t.type === 'blob').map((t: any) => t.path);
    } finally {
      loading = false;
    }
  }

  function summarize() {
    const text = `Letzte Commits: ${commits.map(c => c.commit?.message).join(' | ')}\nDateien: ${files.slice(0,20).join(', ')}...`;
    // Simple in-browser summary placeholder
    summary = `Projekt-Überblick (grob): ${text.slice(0, 600)}...`;
  }
</script>

<style>
  .card { border: 1px solid #ddd; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
</style>

<div class="card">
  <h2>Projekt-Überblick</h2>
  <button on:click={loadInfo} disabled={loading}>{loading ? 'Lade…' : 'Repo laden'}</button>
  <button on:click={summarize} disabled={!commits.length}>Zusammenfassen (Browser)</button>
  {#if commits.length}
    <h3>Letzte Commits</h3>
    <ul>
      {#each commits as c}
        <li>{c.commit?.author?.date?.slice(0,10)} — {c.commit?.message}</li>
      {/each}
    </ul>
    <h3>Dateien (Top 20)</h3>
    <ul>
      {#each files.slice(0,20) as f}
        <li>{f}</li>
      {/each}
    </ul>
  {/if}
  {#if summary}
    <h3>Zusammenfassung</h3>
    <p>{summary}</p>
  {/if}
</div>
