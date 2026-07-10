// Scans public/drone/ for video files, prefers the all-intra processed version
// in public/drone/_processed/ (produced by scripts/process-drone-video.mjs), and
// writes lib/generated/drone-manifest.json so DroneVideoBackground can auto-pick
// the footage. Also probes the real fps (used to snap scroll-seeks to exact
// frames). Runs automatically via `predev` / `prebuild`.
//
// VideoBackground dan DroneVideoBackground membaca manifest ini — cukup taruh
// video di public/drone/ dan jalankan `npm run dev` / `npm run build`.

import { readdirSync, existsSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const DRONE_DIR = join(root, 'public', 'drone');
const PROC_DIR = join(DRONE_DIR, '_processed');
const OUT_DIR = join(root, 'lib', 'generated');
const OUT_FILE = join(OUT_DIR, 'drone-manifest.json');

const EXT_PRIORITY = ['mp4', 'webm', 'm4v', 'mov', 'ogv'];

function rawVideos() {
  if (!existsSync(DRONE_DIR)) return [];
  return readdirSync(DRONE_DIR)
    .filter((f) => {
      const ext = f.split('.').pop()?.toLowerCase() ?? '';
      return EXT_PRIORITY.includes(ext) && !f.startsWith('.');
    })
    .sort((a, b) => {
      const ea = EXT_PRIORITY.indexOf(a.split('.').pop()?.toLowerCase() ?? '');
      const eb = EXT_PRIORITY.indexOf(b.split('.').pop()?.toLowerCase() ?? '');
      return ea - eb;
    });
}

// Prefer the all-intra processed file; fall back to the raw source.
function resolveSrc(file) {
  const base = basename(file, extname(file)) + '.mp4';
  const proc = join(PROC_DIR, base);
  if (existsSync(proc) && statSync(proc).size > 0) {
    return { publicPath: encodeURI(`/drone/_processed/${base}`), diskPath: proc };
  }
  const raw = join(DRONE_DIR, file);
  return { publicPath: encodeURI(`/drone/${file}`), diskPath: raw };
}

function probeFps(diskPath) {
  try {
    const out = execFileSync(
      'ffprobe',
      ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=avg_frame_rate', '-of', 'default=nw=1:nk=1', diskPath],
      { encoding: 'utf8' }
    ).trim();
    const [n, d] = out.split('/').map(Number);
    if (n && d) return n / d;
    if (!Number.isNaN(Number(out)) && out) return Number(out);
  } catch {
    /* ffprobe unavailable — fall back to 30 */
  }
  return 30;
}

const files = rawVideos();
const videos = files.map((f) => {
  const { publicPath, diskPath } = resolveSrc(f);
  return { src: publicPath, fps: Math.round(probeFps(diskPath) * 100) / 100 };
});

const primary = videos[0]?.src ?? null;
const fps = videos[0]?.fps ?? 30;

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify({ videos, primary, fps }, null, 2) + '\n');

if (primary) {
  console.log(`[drone-manifest] Using: ${primary}  (${fps} fps, all-intra)`);
} else {
  console.log('[drone-manifest] No drone video found in public/drone/ — component will use fallback.');
}

