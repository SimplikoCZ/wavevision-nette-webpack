import { UrlWithParsedQuery } from 'url';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import { NeonType, Entries, NeonConfig, Options } from './types';
declare class WebpackHelper {
    constructor(options: Options);
    private readonly neonConfig;
    private readonly options;
    readonly createManifestPlugin: () => WebpackManifestPlugin;
    readonly getDevServerPublicPath: () => string;
    readonly getDevServerUrl: () => UrlWithParsedQuery;
    readonly getDist: () => string;
    readonly getEntries: () => Entries;
    readonly getEnabledEntries: () => string[];
    readonly getManifest: () => string;
    readonly getOutputPath: () => string;
    readonly parseNeonConfig: <T extends NeonType = NeonConfig>() => T;
}
export default WebpackHelper;
