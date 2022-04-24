import {PathLike} from 'fs';

export interface Loader {
    load(uri: PathLike): Promise<string>
};

export interface Parser {
    parse(content: string): string
};

export interface TokenSubstitutor {
    substitute(token: string): string
};

export interface Tokenizer {
    tokenize(input: string, substitutor?: TokenSubstitutor): string
};
