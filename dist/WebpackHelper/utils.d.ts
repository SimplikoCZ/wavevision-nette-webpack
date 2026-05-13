import { ManifestEntries, ManifestOptions } from './types';
export declare const formatManifestChunks: (entries: ManifestEntries, manifest: Record<string, unknown>) => ManifestEntries;
export declare const generateManifest: ManifestOptions['generate'];
export declare const getManifestOptions: (options: ManifestOptions) => ManifestOptions;
