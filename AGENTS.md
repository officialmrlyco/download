# Download website handoff

## Release v1.4.3 metadata refresh (2026-11-04)

- Publishes from main on GitHub Pages to download.bingwaflash.co.ke.
- The verified v43 asset is `17,791,870` bytes (17.0 MiB rounded to one decimal), SHA-256 `232636d7b9c10b93092e325e2101da8fe29e77eeb0abd5dc1bf26cb3973b7b8f`, certificate SHA-256 `68c97236e1d977620d48c75c8f40b1c66facfbe6cfe5576e61f0385f94bfb4d9`.
- `index.html` appends `?build=232636d7b9c10b93` to every APK link, and shows matching size/checksum. `README.md` documents the exact bytes and hash. Keep Build 43 / v1.4.3 and filename unchanged.
- Run `node --test tests/download-metadata.test.mjs` after touching release metadata; it checks that all installer anchors have the cache key and the displayed hash/size match the recorded release.
- Release notes cover ultra-smooth UI with bubble effects, full Relay-to-Bridge upgrade (Wi-Fi Hotspot AP, Bluetooth, SMS, Online), lightning USSD execution speed (120ms settlement), enhanced Portal integration, modified layouts, and comprehensive intake/recovery bug fixes.

## Release v1.4.2 metadata refresh (2026-10-14)

- Publishes from main on GitHub Pages to download.bingwaflash.co.ke.
- The verified existing v42 asset is `16,643,996` bytes (15.9 MiB rounded to one decimal), SHA-256 `cb486f2a5b2c0a42d0cb198705852b1367063f19b5043284e786a318e013c24d`, certificate SHA-256 `68c97236e1d977620d48c75c8f40b1c66facfbe6cfe5576e61f0385f94bfb4d9`. Keep the APK untouched; only its website metadata changed.
- `index.html` appends `?build=cb486f2a5b2c0a42` to every APK link, and shows matching size/checksum. `README.md` documents the exact bytes and hash. Keep Build 42 / v1.4.2 and filename unchanged.
- Run `node --test tests/download-metadata.test.mjs` after touching release metadata; it checks that all installer anchors have the cache key and the displayed hash/size match the recorded release.
- Release notes cover transaction actions, new-client insights/profile copying, and silent USSD admission/pending handling. Do not promise elimination of carrier errors or claim physical-device acceptance.


## Website logo payload optimization (2026-11-02)

- Preserved the 720x720 transparent PNG at its existing path and encoded a 256-color indexed palette with alpha. Download metadata and page references are unchanged.
- Before/after bytes: `logo.png` 208,654 -> 32,304 (720 x 720).
