// dfa.js
import { keywords, operators, delimiters } from './tokens.js';

const isKeyword = (word) => keywords.includes(word);

const isIdentifier = (word) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(word);

const isNumber = (word) => /^[0-9]+(\.[0-9]+)?([Ee][+-]?[0-9]+)?$/.test(word);

const isOperator = (word) => operators.includes(word);

const isDelimiter = (char) => delimiters.includes(char);

const classifyToken = (token) => {
    if (isKeyword(token)) return { type: 'keyword', value: token };
    if (isIdentifier(token)) return { type: 'identifier', value: token };
    if (isNumber(token)) return { type: 'num', value: token };
    if (isOperator(token)) return { type: 'operator', value: token };
    if (isDelimiter(token)) return { type: 'delimiter', value: token };
    return { type: 'error', value: token };
};

export { classifyToken };
