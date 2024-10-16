import { keywords, addop, mulop, relop, logicalAnd, logicalOr, logicalNot, assign, delimiters, whitespace } from './tokens.js';
import { isLetter, isDigit, isInArray } from './utils.js';

// Kiểm tra xem từ có phải là từ khóa không (được định nghĩa ở nơi khác)
const isKeyword = (word) => isInArray(word, keywords);

// Kiểm tra xem có phải là định danh hợp lệ không
const isIdentifier = (word) => {
    if (word.length === 0) return false; // Chuỗi rỗng không phải là định danh hợp lệ
    if (!isLetter(word[0])) return false;  // Ký tự đầu tiên phải là một chữ cái
    for (let i = 1; i < word.length; i++) {
        if (!isLetter(word[i]) && !isDigit(word[i]) && word[i] !== '_') {
            return false;  // Các ký tự tiếp theo phải là chữ cái, chữ số hoặc dấu gạch dưới
        }
    }
    return true;
};

// Kiểm tra xem có phải là số hợp lệ không (hỗ trợ số thập phân và ký hiệu khoa học)
const isNumber = (word) => {
    if (word.length === 0) return false; // Chuỗi rỗng không phải là số hợp lệ
    let dotFound = false;  // Kiểm tra dấu chấm thập phân
    let eFound = false;    // Kiểm tra ký hiệu 'e' cho ký hiệu khoa học

    for (let i = 0; i < word.length; i++) {
        if (word[i] === '.') {
            if (dotFound) return false;  // Chỉ cho phép một dấu chấm thập phân
            dotFound = true;
        } else if (word[i].toLowerCase() === 'e') {
            if (eFound) return false;  // Chỉ cho phép một ký hiệu 'e'
            eFound = true;
            // Xử lý dấu cộng hoặc trừ sau ký hiệu 'e' trong ký hiệu khoa học
            if (i + 1 < word.length && (word[i + 1] === '+' || word[i + 1] === '-')) {
                i++; // Bỏ qua dấu '+' hoặc '-' ngay sau 'e'
                if (i + 1 < word.length && !isDigit(word[i + 1])) {
                    return false; // Nếu không có chữ số sau dấu '+' hoặc '-', không phải là số hợp lệ
                }
            }
        } else if (!isDigit(word[i])) {
            return false;  // Nếu không phải là chữ số thì không phải là số hợp lệ
        }
    }
    return true;
};


// Kiểm tra có phải là toán tử cộng/trừ không
const isAddop = (token) => isInArray(token, addop);

// Kiểm tra có phải là toán tử nhân/chia không
const isMulop = (token) => isInArray(token, mulop);

// Kiểm tra có phải là toán tử quan hệ không
const isRelop = (token) => isInArray(token, relop);

// Kiểm tra có phải là toán tử logic AND không
const isLogicalAnd = (token) => token === logicalAnd;

// Kiểm tra có phải là toán tử logic OR không
const isLogicalOr = (token) => token === logicalOr;

// Kiểm tra có phải là toán tử logic NOT không
const isLogicalNot = (token) => token === logicalNot;

// Kiểm tra có phải là toán tử gán không
const isAssign = (token) => isInArray(token, assign);

// Kiểm tra có phải là dấu phân cách không
const isDelimiter = (char) => isInArray(char, delimiters);

// Kiểm tra có phải là khoảng trắng không
const isWhitespace = (char) => isInArray(char, whitespace);

// Phân loại token dựa trên loại
const classifyToken = (token) => {
    if (isKeyword(token)) return { type: 'keyword', value: token };           // Từ khóa
    if (isIdentifier(token)) return { type: 'identifier', value: token };     // Định danh
    if (isNumber(token)) return { type: 'num', value: token };                // Số
    if (isAddop(token)) return { type: 'addop', value: token };               // Toán tử cộng/trừ
    if (isMulop(token)) return { type: 'mulop', value: token };               // Toán tử nhân/chia
    if (isRelop(token)) return { type: 'relop', value: token };               // Toán tử quan hệ
    if (isLogicalAnd(token)) return { type: 'logicalAnd', value: token };     // Toán tử logic AND
    if (isLogicalOr(token)) return { type: 'logicalOr', value: token };       // Toán tử logic OR
    if (isLogicalNot(token)) return { type: 'logicalNot', value: token };     // Toán tử logic NOT
    if (isAssign(token)) return { type: 'assign', value: token };         // Toán tử gán
    if (isDelimiter(token)) return { type: 'delimiter', value: token };       // Dấu phân cách
    if (isWhitespace(token)) return { type: 'whitespace', value: token };     // Khoảng trắng
    return { type: 'error', value: token };  // Token không xác định
};

// Xuất các hàm để sử dụng ở các module khác
export { 
    classifyToken, 
    isAssign, 
    isDelimiter, 
    isWhitespace, 
    isAddop, 
    isMulop, 
    isRelop, 
    isLogicalAnd, 
    isLogicalOr, 
    isLogicalNot, 
    isIdentifier, 
    isNumber 
};
