import * as contracts from '../contracts.js';

const SimpleTokenizer: contracts.Tokenizer = {
    tokenize(input: string, tokenMapper?: contracts.TokenSubstitutor): string {
        return input.replace(/\$\{.*\}/g, (token) => {
            token = token
                .replace('${', '')
                .replace('}', '');
            return tokenMapper ? tokenMapper.substitute(token) : token;
        });
    }
};

export default SimpleTokenizer;
