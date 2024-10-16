// lexer.js
import { classifyToken } from './dfa.js';
import { delimiters } from './tokens.js';

const tokenize = (code) => {
    let tokens = [];
    let currentToken = '';

    const addToken = (token) => {
        if (token.trim() !== '') {
            tokens.push(classifyToken(token));
        }
    };

    for (let i = 0; i < code.length; i++) {
        const char = code[i];

        if (/\s/.test(char)) {
            addToken(currentToken);
            currentToken = '';
        } else if (delimiters.includes(char)) {
            addToken(currentToken);
            tokens.push(classifyToken(char));
            currentToken = '';
        } else if (/[\+\-\*\/=<>!]/.test(char)) {
            addToken(currentToken);
            currentToken = char;
            const nextChar = code[i + 1];
            if (nextChar && (nextChar === '=' || (char === '&' && nextChar === '&') || (char === '|' && nextChar === '|'))) {
                currentToken += nextChar;
                i++;
            }
            addToken(currentToken);
            currentToken = '';
        } else {
            currentToken += char;
        }
    }

    addToken(currentToken);
    return tokens;
};

export { tokenize };
