import * as contracts from '../contracts.js';
import {PathLike} from 'fs';
import fs from 'fs';

const DEFAULT_PATH: string = 'config.yaml';

const FileLoader: contracts.Loader = {
    load(uri: PathLike): Promise<string> {
        uri = uri as string || DEFAULT_PATH;
        return Promise.resolve(fs.readFileSync(uri, 'utf8'));
    }
};

export default FileLoader;
