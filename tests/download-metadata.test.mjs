// Keep installer links, the visible integrity label, and release notes tied to the verified v42 artifact.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const apkUrl = 'https://github.com/officialmrlyco/BingwaFlashApp/releases/download/v42/BingwaFlash_v1.4.2.apk?build=cb486f2a5b2c0a42';
const sha256 = 'cb486f2a5b2c0a42d0cb198705852b1367063f19b5043284e786a318e013c24d';

test('all installer links and visible integrity details match the verified v42 asset', async () => {
  const [html, readme] = await Promise.all([
    readFile(new URL('index.html', root), 'utf8'),
    readFile(new URL('README.md', root), 'utf8'),
  ]);
  const links = [...html.matchAll(/href="([^"]+\.apk(?:\?[^"]*)?)"/g)].map((match) => match[1]);

  assert.equal(links.length, 2, 'both installer buttons must remain present');
  assert.deepEqual(links, [apkUrl, apkUrl]);
  assert.ok(html.includes(sha256), 'the page must display the complete verified SHA-256');
  assert.ok(html.includes('16,643,996'), 'the page must retain the exact byte count');
  assert.ok(html.includes('15.9 MB'), 'the visible file size must match the rounded byte count');
  assert.ok(readme.includes('16,643,996'), 'handoff notes must retain the exact byte count');
  assert.ok(readme.includes(sha256), 'handoff notes must retain the complete verified SHA-256');
});
