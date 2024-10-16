import { keywords, operators, delimiters, whitespace } from './tokens.js';
import { isLetter, isDigit, isInArray } from './utils.js';

const isKeyword = (word) => isInArray(word, keywords);

const isIdentifier = (word) => {
    if (word.length === 0) return false;
    if (!isLetter(word[0])) return false;
    for (let i = 1; i < word.length; i++) {
        if (!isLetter(word[i]) && !isDigit(word[i]) && word[i] !== '_') {
            return false;
        }
    }
    return true;
};

const isNumber = (word) => {
    if (word.length === 0) return false;
    let dotFound = false;
    let eFound = false;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === '.') {
            if (dotFound) return false;
            dotFound = true;
        } else if (word[i].toLowerCase() === 'e') {
            if (eFound) return false;
            eFound = true;
            if (i + 1 < word.length && (word[i + 1] === '+' || word[i + 1] === '-')) {
                i++;
            }
        } else if (!isDigit(word[i])) {
            return false;
        }
    }
    return true;
};

const isOperator = (word) => isInArray(word, operators);
const isDelimiter = (char) => isInArray(char, delimiters);
const isWhitespace = (char) => isInArray(char, whitespace);

const classifyToken = (token) => {
    if (isKeyword(token)) return { type: 'keyword', value: token };
    if (isIdentifier(token)) return { type: 'identifier', value: token };
    if (isNumber(token)) return { type: 'num', value: token };
    if (isOperator(token)) return { type: 'operator', value: token };
    if (isDelimiter(token)) return { type: 'delimiter', value: token };
    if (isWhitespace(token)) return { type: 'whitespace', value: token };
    return { type: 'error', value: token };
};


export { classifyToken, isOperator, isDelimiter, isWhitespace };

