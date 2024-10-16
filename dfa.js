// dfa.js
import { keywords, operators, delimiters } from './tokens.js';
import { isLetter, isDigit, isInArray } from './utils.js';

const isKeyword = (word) => isInArray(word, keywords);

const isIdentifier = (word) => {
    if (word.length === 0) return false; // Định danh không được rỗng
    if (!isLetter(word[0])) return false; // Ký tự đầu tiên phải là chữ cái hoặc dấu gạch dưới
    for (let i = 1; i < word.length; i++) {
        if (!isLetter(word[i]) && !isDigit(word[i]) && word[i] !== '_') {
            return false; // Các ký tự sau phải là chữ cái, số hoặc dấu gạch dưới
        }
    }
    return true;
};

const isNumber = (word) => {
    if (word.length === 0) return false; // Không được rỗng
    let dotFound = false; // Kiểm tra dấu chấm
    let eFound = false; // Kiểm tra chữ cái E
    for (let i = 0; i < word.length; i++) {
        if (word[i] === '.') {
            if (dotFound) return false; // Không được có nhiều hơn 1 dấu chấm
            dotFound = true;
        } else if (word[i].toLowerCase() === 'e') {
            if (eFound) return false; // Không được có nhiều hơn 1 E
            eFound = true;
            // Kiểm tra ký tự tiếp theo sau E
            if (i + 1 < word.length && (word[i + 1] === '+' || word[i + 1] === '-')) {
                i++; // Bỏ qua dấu + hoặc - nếu có
            }
        } else if (!isDigit(word[i])) {
            return false; // Tất cả ký tự khác phải là chữ số
        }
    }
    return true;
};

const isOperator = (word) => isInArray(word, operators);

const isDelimiter = (char) => isInArray(char, delimiters);

const classifyToken = (token) => {
    if (isKeyword(token)) return { type: 'keyword', value: token };
    if (isIdentifier(token)) return { type: 'identifier', value: token };
    if (isNumber(token)) return { type: 'num', value: token };
    if (isOperator(token)) return { type: 'operator', value: token };
    if (isDelimiter(token)) return { type: 'delimiter', value: token };
    return { type: 'error', value: token };
};

export { classifyToken };
