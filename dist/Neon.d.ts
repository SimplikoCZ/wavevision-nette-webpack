import { NeonType } from './WebpackHelper/types';
declare const _default: {
    decode: <T extends NeonType>(path: string) => T;
    replaceParam: (param: string, needle: string, replace: string) => string;
    replaceWwwDir: (param: string, wwwDir: string) => string;
};
export default _default;
