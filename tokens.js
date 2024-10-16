// tokens.js

const keywords = [
    'void', 'int', 'for', 'while', 'if', 'else', 'return', 'break', 'continue', 'float'
];

const assign = ['='];
const addop = ['+', '-'];
const mulop = ['*', '/'];
const relop = ['<', '>', '<=', '>=', '==', '!='];
const logicalAnd = '&&';
const logicalOr = '||';
const logicalNot = '!';
const delimiters = ['(', ')', '{', '}', ';', ',']; 
const whitespace = [' ', '\t', '\n'];

export {
    keywords,
    assign,
    addop,
    mulop,
    relop,
    logicalAnd,
    logicalOr,
    logicalNot,
    delimiters,
    whitespace,
};
