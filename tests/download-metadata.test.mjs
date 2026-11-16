// Keep installer links, the visible integrity label, and release notes tied to the verified v44 artifact.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const apkUrl = 'https://github.com/officialmrlyco/BingwaFlashApp/releases/download/v44/BingwaFlash_v1.4.4.apk?build=803ed539574c9dc7';
const sha256 = '803ed539574c9dc71c8c7eaa02489f45430f96df0b511df4958f16dcc1be19ec';

test('all installer links and visible integrity details match the verified v44 asset', async () => {
  const [html, readme] = await Promise.all([
    readFile(new URL('index.html', root), 'utf8'),
    readFile(new URL('README.md', root), 'utf8'),
  ]);
  const links = [...html.matchAll(/href="([^"]+\.apk(?:\?[^"]*)?)"/g)].map((match) => match[1]);

  assert.equal(links.length, 2, 'both installer buttons must remain present');
  assert.deepEqual(links, [apkUrl, apkUrl]);
  assert.ok(html.includes(sha256), 'the page must display the complete verified SHA-256');
  assert.ok(html.includes('18,168,806'), 'the page must retain the exact byte count');
  assert.ok(html.includes('17.3 MB'), 'the visible file size must match the rounded byte count');
  assert.ok(readme.includes('18,168,806'), 'handoff notes must retain the exact byte count');
  assert.ok(readme.includes(sha256), 'handoff notes must retain the complete verified SHA-256');
});
