import raw from '#lib/data/reports-4471.json';
import notes from '#lib/data/desk-notes.json';
import { groupByCause, uniqueById, sameCause, type Report } from '#lib/kb/causes';
import { tenantOf } from '#lib/kb/locales';

export const sourceRows = raw.length;
export const reports = uniqueById(raw as Report[]).filter(r => r.mergedInto === 4471);
export const duplicateRows = sourceRows - uniqueById(raw as Report[]).length;
export const groups = groupByCause(reports, tenantOf);
export const exceptional = reports.filter(r => notes.oneDayMove.includes(r.id));
export const tagDisagreements = groups.reduce((n,g) => n + g.reports.filter(r => r.meta.intakeTag !== g.cause).length, 0);
export const days = reports.map(r => r.receivedAt.slice(0,10)).sort();
export const mergeDays = reports.map(r => r.mergedAt?.slice(0,10)).filter(Boolean).sort();
export { sameCause, tenantOf };
