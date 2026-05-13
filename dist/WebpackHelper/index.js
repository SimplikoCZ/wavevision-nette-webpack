"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const path_1 = require("path");
const webpack_manifest_plugin_1 = require("webpack-manifest-plugin");
const Neon_1 = __importDefault(require("../Neon"));
const constants_1 = require("../constants");
const utils_1 = require("./utils");
class WebpackHelper {
    constructor(options) {
        this.options = options;
        this.neonConfig = this.options.neonPath ? this.parseNeonConfig() : {};
    }
    neonConfig;
    options;
    createManifestPlugin = () => new webpack_manifest_plugin_1.WebpackManifestPlugin((0, utils_1.getManifestOptions)({
        ...(this.options.manifestOptions || {}),
        fileName: this.getManifest(),
        publicPath: '',
    }));
    getDevServerPublicPath = () => `${this.getDevServerUrl().href}${this.getDist()}/`;
    getDevServerUrl = () => {
        if (this.neonConfig.webpack &&
            this.neonConfig.webpack.devServer &&
            this.neonConfig.webpack.devServer.url) {
            return (0, url_1.parse)(this.neonConfig.webpack.devServer.url, true);
        }
        return (0, url_1.parse)(constants_1.DEFAULT_URL, true);
    };
    getDist = () => {
        if (this.neonConfig.webpack && this.neonConfig.webpack.dist) {
            return this.neonConfig.webpack.dist;
        }
        return constants_1.DEFAULT_DIST;
    };
    getEntries = () => {
        if (this.neonConfig.webpack && this.neonConfig.webpack.entries) {
            return this.neonConfig.webpack.entries;
        }
        return constants_1.DEFAULT_ENTRIES;
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
        return constants_1.DEFAULT_MANIFEST;
    };
    getOutputPath = () => {
        if (this.neonConfig.webpack && this.neonConfig.webpack.dir) {
            return Neon_1.default.replaceWwwDir(this.neonConfig.webpack.dir, this.options.wwwDir);
        }
        return (0, path_1.resolve)(this.options.wwwDir, this.getDist());
    };
    parseNeonConfig = () => {
        if (!this.options.neonPath) {
            throw new Error("Unable to parse neon config without 'neonPath' option defined.");
        }
        return Neon_1.default.decode(this.options.neonPath);
    };
}
exports.default = WebpackHelper;
//# sourceMappingURL=index.js.map