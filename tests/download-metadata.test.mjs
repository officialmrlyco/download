// Keep installer links, the visible integrity label, and release notes tied to the verified v43 artifact.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const apkUrl = 'https://github.com/officialmrlyco/BingwaFlashApp/releases/download/v43/BingwaFlash_v1.4.3.apk?build=232636d7b9c10b93';
const sha256 = '232636d7b9c10b93092e325e2101da8fe29e77eeb0abd5dc1bf26cb3973b7b8f';

test('all installer links and visible integrity details match the verified v43 asset', async () => {
  const [html, readme] = await Promise.all([
    readFile(new URL('index.html', root), 'utf8'),
    readFile(new URL('README.md', root), 'utf8'),
  ]);
  const links = [...html.matchAll(/href="([^"]+\.apk(?:\?[^"]*)?)"/g)].map((match) => match[1]);

  assert.equal(links.length, 2, 'both installer buttons must remain present');
  assert.deepEqual(links, [apkUrl, apkUrl]);
  assert.ok(html.includes(sha256), 'the page must display the complete verified SHA-256');
  assert.ok(html.includes('17,791,870'), 'the page must retain the exact byte count');
  assert.ok(html.includes('17.0 MB'), 'the visible file size must match the rounded byte count');
  assert.ok(readme.includes('17,791,870'), 'handoff notes must retain the exact byte count');
  assert.ok(readme.includes(sha256), 'handoff notes must retain the complete verified SHA-256');
});
