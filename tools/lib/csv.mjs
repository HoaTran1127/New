import fs from 'fs';

// Tách một dòng CSV có dấu nháy kép chuẩn RFC4180 ("" là dấu nháy trong giá trị).
export function parseLine(line) {
  const out = [];
  let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) {
      if (c === '"') {
        if (line[i + 1] === '"') { cur += '"'; i++; } else q = false;
      } else cur += c;
    } else if (c === '"') q = true;
    else if (c === ',') { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur);
  return out;
}

export function readCatalog(file) {
  const text = fs.readFileSync(file, 'utf8').replace(/\r/g, '');
  const lines = text.split('\n').filter((l) => l.trim());
  const header = parseLine(lines[0]);
  return lines.slice(1).map((l) => {
    const cells = parseLine(l);
    const row = Object.fromEntries(header.map((h, i) => [h, cells[i] ?? '']));
    // Dọn dấu nháy lọt vào trong giá trị do máy sinh catalog cũ để lại.
    for (const k of Object.keys(row)) row[k] = row[k].replace(/^"|"$/g, '').trim();
    return row;
  });
}

export function writeCatalog(file, header, rows) {
  const esc = (v) => '"' + String(v).replace(/"/g, '""') + '"';
  const body = rows.map((r) => header.map((h) => esc(r[h] ?? '')).join(','));
  fs.writeFileSync(file, [header.map(esc).join(','), ...body].join('\n') + '\n', 'utf8');
}
