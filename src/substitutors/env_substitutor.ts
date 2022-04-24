import * as contracts from '../contracts.js';

const EnvTokenSubstitutor: contracts.TokenSubstitutor = {
    substitute(token: string): string {
        const tokenAndDefault: string[] = token.split(':-')
        if(!process.env[tokenAndDefault[0]] && tokenAndDefault.length < 2) {
            throw new Error(`No substitution found for token: ${token}`);
        }
        return process.env[tokenAndDefault[0]] || (tokenAndDefault[1] || '');
    }
};

export default EnvTokenSubstitutor;
