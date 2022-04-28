import * as contracts from '../contracts.js';

const JsonParser: contracts.Parser = {
    parse(content: string): string {
        return JSON.parse(content);
    }
};

export default JsonParser;
