<script lang="ts">
  import { reports, sourceRows, duplicateRows, groups, exceptional, tagDisagreements, days, mergeDays, tenantOf } from '#lib/kb/incident-review';
</script>

<p><strong>{reports.length}</strong> unique reports from <strong>{sourceRows}</strong> export rows; <strong>{duplicateRows}</strong> repeated IDs removed. The tenant-aware rules produce <strong>{groups.length}</strong> causes, with <strong>{tagDisagreements}</strong> intake-tag disagreements.</p>
<p>Reports arrived from {days[0]} through {days.at(-1)}; merges occurred from {mergeDays[0]} through {mergeDays.at(-1)}. Received and merged dates describe different events.</p>
<table>
  <caption>Recomputed from report IDs, tenant locale, form version, and channel</caption>
  <thead><tr><th>Problem</th><th>Reports</th><th>Tenants</th><th>First / last received</th><th>Intake labels</th></tr></thead>
  <tbody>{#each groups as g}<tr><th>{g.cause}</th><td>{g.reports.length}</td><td>{g.tenants}</td><td>{g.firstSeen} / {g.lastSeen}</td><td>{Object.entries(g.taggedAs).map(([tag,n]) => `${tag}: ${n}`).join('; ')}</td></tr>{/each}</tbody>
</table>
<h2>What each ticket covers</h2>
{#each groups as g}
  <details><summary>{g.cause}: {g.reports.length} report IDs</summary><p>{g.reports.map(r => r.id).join(', ')}</p></details>
{/each}
<h2>Reports needing symptom verification</h2>
<p>The desk explicitly flagged {exceptional.length} reports as a one-day move. Its running classifier places them under parser by tenant; that is a routing rule, not proof that every symptom has that root cause. Keep these reports visible and investigate timezone, timestamp, and date-only handling before closing them.</p>
<table><thead><tr><th>ID</th><th>Tenant / entry</th><th>Reported symptom</th></tr></thead><tbody>{#each exceptional as r}<tr><td>{r.id}</td><td>{tenantOf(r)?.name} / {r.channel}</td><td>{r.body}</td></tr>{/each}</tbody></table>
<style>details{border-block-end:1px solid var(--line);padding:.6rem 0}summary{cursor:pointer}details p{overflow-wrap:anywhere;font-family:var(--mono);font-size:.8rem}caption{text-align:left;color:var(--muted);font-size:.85rem}</style>
