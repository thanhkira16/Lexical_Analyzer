// tokens.js

const keywords = [
    'void', 'int', 'for', 'while', 'if', 'else', 'return', 'break', 'continue', 'float'
];

const operators = ['+', '-', '=', '==', '<', '>', '<=', '>=', '!='];
const addop = ['+', '-'];
const mulop = ['*', '/'];
const relop = ['<', '>', '<=', '>=', '==', '!='];
const logicalAnd = '&&';
const logicalOr = '||';
const logicalNot = '!';
const delimiters = ['(', ')', '{', '}', ';'];
const whitespace = [' ', '\t', '\n', '\r'];

export {
    keywords,
    operators,
    addop,
    mulop,
    relop,
    logicalAnd,
    logicalOr,
    logicalNot,
    delimiters,
    whitespace,
};
