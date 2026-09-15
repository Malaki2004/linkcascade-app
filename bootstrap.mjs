import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import process from 'node:process';

const archiveUrl = 'https://raw.githubusercontent.com/Malaki2004/linkcascade-app/linkcascade-vercel-migration/migration-mini/lcmini.tar.xz';
const archivePath = '/tmp/lcmini.tar.xz';
const res = await fetch(archiveUrl);
if (!res.ok) throw new Error(`Archive download failed: ${res.status} ${res.statusText}`);
writeFileSync(archivePath, Buffer.from(await res.arrayBuffer()));

execFileSync('tar', ['-xJf', archivePath, '-C', process.cwd()], { stdio: 'inherit' });
execFileSync('npm', ['install', '--prefix', 'apps/web'], { stdio: 'inherit' });
execFileSync('npm', ['run', 'build', '--prefix', 'apps/web'], { stdio: 'inherit' });
