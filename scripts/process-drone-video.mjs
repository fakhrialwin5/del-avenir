// Re-encodes every raw video in public/drone/ into an ALL-INTRA (every frame a
// keyframe) MP4 under public/drone/_processed/. All-intra makes scroll-scrubbing
// hit an exact, independently-decodable frame at any currentTime — eliminating
// the "cut / dropped frames" you get when seeking inside a long-GOP video.
// Runs automatically via the `predev` / `prebuild` npm scripts (before the
// manifest is generated). Existing processed files are reused unless the source
// changed.

import { readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const DRONE_DIR = join(root, 'public', 'drone');
const OUT_DIR = join(DRONE_DIR, '_processed');

const EXT_PRIORITY = ['mp4', 'webm', 'm4v', 'mov', 'ogv'];

function rawVideos() {
  if (!existsSync(DRONE_DIR)) return [];
  return readdirSync(DRONE_DIR)
    .filter((f) => {
      const ext = f.split('.').pop()?.toLowerCase() ?? '';
      return EXT_PRIORITY.includes(ext);
    })
    .sort((a, b) => {
      const ea = EXT_PRIORITY.indexOf(a.split('.').pop()?.toLowerCase() ?? '');
      const eb = EXT_PRIORITY.indexOf(b.split('.').pop()?.toLowerCase() ?? '');
      return ea - eb;
    });
}

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

let didWork = false;
for (const file of rawVideos()) {
  const src = join(DRONE_DIR, file);
  const base = basename(file, extname(file)) + '.mp4';
  const dst = join(OUT_DIR, base);

  const srcMtime = statSync(src).mtimeMs;
  const exists = existsSync(dst);
  const dstMtime = exists ? statSync(dst).mtimeMs : 0;

  if (exists && dstMtime >= srcMtime) {
    console.log(`[drone-process] up-to-date: _processed/${base}`);
    continue;
  }

  console.log(`[drone-process] re-encoding (all-intra): ${file} -> _processed/${base}`);
  const res = spawnSync(
    'ffmpeg',
    [
      '-y',
      '-i', src,
      '-an',                       // drop audio (we mute anyway)
      '-c:v', 'libx264',
      '-preset', 'ultrafast',
      '-crf', '18',
      '-g', '1',                   // every frame = keyframe (all-intra)
      '-keyint_min', '1',
      '-sc_threshold', '0',
      '-pix_fmt', 'yuv420p',
      '-vf', "scale='min(1920,iw)':-2", // cap width for faster decode
      '-movflags', '+faststart',
      dst,
    ],
    { stdio: 'inherit' }
  );

  if (res.status !== 0) {
    console.error(`[drone-process] FAILED for ${file} (ffmpeg exited ${res.status})`);
  } else {
    didWork = true;
  }
}

if (!didWork && rawVideos().length) {
  console.log('[drone-process] nothing to do.');
}
