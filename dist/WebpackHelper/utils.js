"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManifestOptions = exports.generateManifest = exports.formatManifestChunks = void 0;
const formatManifestChunks = (entries, manifest) => {
    const chunks = {};
    for (const asset in manifest) {
        const name = manifest[asset];
        for (const entry in entries) {
            if (!chunks[entry])
                chunks[entry] = [];
            for (const entryAsset of entries[entry]) {
                if (name === entryAsset && !name.includes('.map')) {
                    chunks[entry].push(asset);
                }
            }
        }
    }
    return chunks;
};
exports.formatManifestChunks = formatManifestChunks;
const generateManifest = (seed, files, entries) => {
    const manifest = files.reduce((manifest, { name, path }) => ({
        ...manifest,
        [name]: path,
    }), seed);
    return Object.assign(manifest, {
        chunks: (0, exports.formatManifestChunks)(entries, manifest),
    });
};
exports.generateManifest = generateManifest;
const getManifestOptions = (options) => {
    const generator = options.generate;
    let currentGenerator = exports.generateManifest;
    if (typeof generator === 'function') {
        currentGenerator = (seed, files, entries) => generator((0, exports.generateManifest)(seed, files, entries), files, entries);
    }
    return { ...options, generate: currentGenerator };
};
exports.getManifestOptions = getManifestOptions;
//# sourceMappingURL=utils.js.map