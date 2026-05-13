export const formatManifestChunks = (entries, manifest) => {
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
export const generateManifest = (seed, files, entries) => {
    const manifest = files.reduce((manifest, { name, path }) => ({
        ...manifest,
        [name]: path,
    }), seed);
    return Object.assign(manifest, {
        chunks: formatManifestChunks(entries, manifest),
    });
};
export const getManifestOptions = (options) => {
    const generator = options.generate;
    let currentGenerator = generateManifest;
    if (typeof generator === 'function') {
        currentGenerator = (seed, files, entries) => generator(generateManifest(seed, files, entries), files, entries);
    }
    return { ...options, generate: currentGenerator };
};
//# sourceMappingURL=utils.js.map