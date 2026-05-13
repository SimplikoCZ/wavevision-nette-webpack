import { readFileSync } from 'fs';
// eslint-disable-next-line
// @ts-ignore
import neon from 'neon-js';
const decode = (path) => neon.decode(readFileSync(path).toString()).toObject(true);
const replaceParam = (param, needle, replace) => param.replace(needle, replace);
const replaceWwwDir = (param, wwwDir) => replaceParam(param, '%wwwDir%', wwwDir);
export default { decode, replaceParam, replaceWwwDir };
//# sourceMappingURL=Neon.js.map