# S01E03 deliverables

The original 2026-10-04 support-kb export is preserved. Added pages are proposals signed by Michał Wirkus.

- Review source: `src/routes/kb/incidents/4471-review/+page.svx`
- Review as rendered: `build/kb/incidents/4471-review/index.html` (assets included under `build/_app`)
- Proposed replacement decision: `src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx`
- Computed evidence: `src/lib/kb/incident-review.ts` and `IncidentReview.svelte`
- Original rendering components are reused for the cause table, receive/merge timeline, and duplicate explorer.

## Run and reproduce

Use Node.js 22 or later. Run `npm ci`, `npm run build`, then `npm run preview -- --port 4173`.
Open `/kb/incidents/4471-review/`. The static `build/` directory includes the actual server-rendered page and its assets.

## Verified against the export

The rendered review shows 427 export rows, 412 unique reports, and 15 repeated IDs. The running tenant-aware classifier assigns 379 reports to parser and 33 to hint, with 38 disagreements against intake tags. Five flagged timing symptoms remain visible for investigation; routing is not proof of each symptom's cause. All original export files remain byte-for-byte unchanged, including accepted decision 0001.

The interactive duplicate explorer was checked: identical subjects with alder.physio/form and kettle.books/form stay separate; changing both tenants to alder.physio makes the cause match. The review renders desk reference DR-8R6Z-29Y3 from its signature, rather than typing the reference into the page.

These counts describe the exported dataset, not a live desk. Refresh the export and rebuild before using them as current queue statistics.
