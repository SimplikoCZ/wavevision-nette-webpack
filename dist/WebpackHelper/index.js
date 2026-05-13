import { parse } from 'url';
import { resolve } from 'path';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import Neon from '../Neon';
import { DEFAULT_DIST, DEFAULT_ENTRIES, DEFAULT_MANIFEST, DEFAULT_URL, } from '../constants';
import { getManifestOptions } from './utils';
class WebpackHelper {
    constructor(options) {
        this.options = options;
        this.neonConfig = this.options.neonPath ? this.parseNeonConfig() : {};
    }
    neonConfig;
    options;
    createManifestPlugin = () => new WebpackManifestPlugin(getManifestOptions({
        ...(this.options.manifestOptions || {}),
        fileName: this.getManifest(),
        publicPath: '',
    }));
    getDevServerPublicPath = () => `${this.getDevServerUrl().href}${this.getDist()}/`;
    getDevServerUrl = () => {
        if (this.neonConfig.webpack &&
            this.neonConfig.webpack.devServer &&
            this.neonConfig.webpack.devServer.url) {
            return parse(this.neonConfig.webpack.devServer.url, true);
        }
        return parse(DEFAULT_URL, true);
    };
    getDist = () => {
        if (this.neonConfig.webpack && this.neonConfig.webpack.dist) {
            return this.neonConfig.webpack.dist;
        }
        return DEFAULT_DIST;
    };
    getEntries = () => {
        if (this.neonConfig.webpack && this.neonConfig.webpack.entries) {
            return this.neonConfig.webpack.entries;
        }
        return DEFAULT_ENTRIES;
    };
    getEnabledEntries = () => {
        const enabled = [];
        const entries = this.getEntries();
        for (const entry in entries) {
            if (entries[entry] === true)
                enabled.push(entry);
        }
        return enabled;
    };
    getManifest = () => {
        if (this.neonConfig.webpack && this.neonConfig.webpack.manifest) {
            return this.neonConfig.webpack.manifest;
        }
        return DEFAULT_MANIFEST;
    };
    getOutputPath = () => {
        if (this.neonConfig.webpack && this.neonConfig.webpack.dir) {
            return Neon.replaceWwwDir(this.neonConfig.webpack.dir, this.options.wwwDir);
        }
        return resolve(this.options.wwwDir, this.getDist());
    };
    parseNeonConfig = () => {
        if (!this.options.neonPath) {
            throw new Error("Unable to parse neon config without 'neonPath' option defined.");
        }
        return Neon.decode(this.options.neonPath);
    };
}
export default WebpackHelper;
//# sourceMappingURL=index.js.map