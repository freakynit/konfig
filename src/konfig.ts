import * as contracts from './contracts.js';
import FileLoader from './loaders/file_loader.js';
import YamlParser from './parsers/yaml_parser.js';
import SimpleTokenizer from './tokenizers/simple_tokenizer.js';
import EnvTokenSubstitutor from './substitutors/env_substitutor.js';

const isFunction = (arg: any) => Object.prototype.toString.call(arg) === '[object Function]';

type LoaderProvider = (...args: any[]) => contracts.Loader;
type TokenizerProvider = (...args: any[]) => contracts.Tokenizer;
type TokenSubstitutorProvider = (...args: any[]) => contracts.TokenSubstitutor;
type ParserProvider = (...args: any[]) => contracts.Parser;

export type Providers = {
    loader?: contracts.Loader | LoaderProvider,
    tokenizer?: contracts.Tokenizer | TokenizerProvider,
    tokenSubstitutor?: contracts.TokenSubstitutor | TokenSubstitutorProvider,
    parser?: contracts.Parser | ParserProvider
};

export const configure = async (input?: string, providers?: Providers): Promise<string> => {
    input = input || 'config.yaml';
    let loader = providers?.loader || FileLoader;
    let tokenizer = providers?.tokenizer || SimpleTokenizer;
    let tokenSubstitutor = providers?.tokenSubstitutor || EnvTokenSubstitutor
    let parser = providers?.parser || YamlParser;

    loader = isFunction(loader) ? (loader as LoaderProvider)() : loader as contracts.Loader;
    tokenizer = isFunction(tokenizer) ? (tokenizer as TokenizerProvider)() : tokenizer as contracts.Tokenizer;
    tokenSubstitutor = isFunction(tokenSubstitutor) ? (tokenSubstitutor as TokenSubstitutorProvider)() : tokenSubstitutor as contracts.TokenSubstitutor;
    parser = isFunction(parser) ? (parser as ParserProvider)() : parser as contracts.Parser;

    return parser.parse(tokenizer.tokenize(await loader.load(input), tokenSubstitutor));
};

// export const configure = async (
//     input?: string
//     , loader?: contracts.Loader
//     , tokenizer?: contracts.Tokenizer
//     , tokenSubstitutor?: contracts.TokenSubstitutor
//     , parser?: contracts.Parser): Promise<string> => {
//
//     input = input || 'config.yaml';
//     loader = loader || FileLoader;
//     parser = parser || YamlParser;
//     tokenizer = tokenizer || SimpleTokenizer;
//     tokenSubstitutor = tokenSubstitutor || EnvTokenSubstitutor
//
//     return parser.parse(tokenizer.tokenize(await loader.load(input), tokenSubstitutor));
// };
