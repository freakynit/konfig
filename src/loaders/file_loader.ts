import * as contracts from '../contracts.js';
import {PathLike} from 'fs';
import fs from 'fs';

const FileLoader: contracts.Loader = {
    load(uri: PathLike): Promise<string> {
        return Promise.resolve(fs.readFileSync(uri, 'utf8'));
        // return new Promise<string>((resolve, reject) => {
        //     fs.readFile(uri, (err, buf) => {
        //         err ? reject(err) : resolve(buf.toString('utf8'));
        //     });
        // });
    }
};

export default FileLoader;
