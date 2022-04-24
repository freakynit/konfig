import * as contracts from '../contracts.js';
import YAML from 'yaml';

const YamlParser: contracts.Parser = {
    parse(content: string): string {
        return YAML.parse(content);
    }
};

export default YamlParser;
