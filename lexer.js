import { classifyToken } from './dfa.js';
import { isDelimiter, isWhitespace, isOperator } from './dfa.js';

const tokenize = (code) => {
    let tokens = [];
    let currentToken = '';

    const addToken = (token) => {
        if (token.length > 0 && !isWhitespace(token)) {
            tokens.push(classifyToken(token));
        }
    };

    for (let i = 0; i < code.length; i++) {
        const char = code[i];

        if (isWhitespace(char)) {
            addToken(currentToken);
            currentToken = '';
        } else if (isDelimiter(char)) {
            addToken(currentToken);
            tokens.push(classifyToken(char));
            currentToken = '';
        } else if (isOperator(char)) {
            addToken(currentToken);
            currentToken = char;
            const nextChar = code[i + 1];
            // Kiểm tra toán tử kép như "==", "&&", "||"
            if (nextChar && isOperator(nextChar) && 
                ((char === '=' && nextChar === '=') || 
                 (char === '&' && nextChar === '&') || 
                 (char === '|' && nextChar === '|'))) {
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
