//lexer.js
import {
    classifyToken,    // Hàm phân loại token dựa trên loại của nó
    isDelimiter,      // Kiểm tra xem ký tự có phải là dấu phân cách không
    isWhitespace,     // Kiểm tra xem ký tự có phải là khoảng trắng không
    isAddop,          // Kiểm tra xem ký tự có phải là toán tử cộng/trừ không
    isMulop,          // Kiểm tra xem ký tự có phải là toán tử nhân/chia không
    isRelop,          // Kiểm tra xem ký tự có phải là toán tử quan hệ không
    isLogicalAnd,     // Kiểm tra xem ký tự có phải là toán tử logic AND không
    isLogicalOr,      // Kiểm tra xem ký tự có phải là toán tử logic OR không
    isLogicalNot,     // Kiểm tra xem ký tự có phải là toán tử logic NOT không
    isNumber          // Kiểm tra xem ký tự có phải là số không (bao gồm cả số khoa học)
} from './dfa.js';

// Hàm phân tách mã nguồn thành các token
const tokenize = (code) => {
    let tokens = [];       // Mảng chứa các token đã phân loại
    let currentToken = ''; // Biến lưu trữ token hiện tại đang xử lý

    // Hàm thêm token vào mảng nếu không phải là khoảng trắng
    const addToken = (token) => {
        if (token.length > 0 && !isWhitespace(token)) {
            tokens.push(classifyToken(token)); // Phân loại và thêm token vào mảng
        }
    };

    // Vòng lặp qua từng ký tự trong mã nguồn
    for (let i = 0; i < code.length; i++) {
        const char = code[i]; // Lấy ký tự hiện tại

        // Kiểm tra nếu ký tự là khoảng trắng
        if (isWhitespace(char)) {
            addToken(currentToken); // Thêm token hiện tại vào mảng
            currentToken = '';      // Đặt lại token hiện tại
        }
        // Kiểm tra nếu ký tự là dấu phân cách
        else if (isDelimiter(char)) {
            addToken(currentToken);  // Thêm token hiện tại
            tokens.push(classifyToken(char)); // Thêm dấu phân cách làm token
            currentToken = '';       // Đặt lại token hiện tại
        }
        // Kiểm tra nếu ký tự là toán tử cộng/trừ
        else if (isAddop(char)) {
            addToken(currentToken);  // Thêm token hiện tại
            currentToken = char;     // Gán toán tử cộng/trừ làm token mới
            addToken(currentToken);  // Thêm vào mảng
            currentToken = '';       // Đặt lại token hiện tại
        }
        // Kiểm tra nếu ký tự là toán tử nhân/chia
        else if (isMulop(char)) {
            addToken(currentToken);  // Thêm token hiện tại
            currentToken = char;     // Gán toán tử nhân/chia làm token mới
            addToken(currentToken);  // Thêm vào mảng
            currentToken = '';       // Đặt lại token hiện tại
        }
        // Kiểm tra nếu ký tự là toán tử quan hệ
        else if (isRelop(char)) {
            addToken(currentToken);  // Thêm token hiện tại
            currentToken = char;     // Gán toán tử quan hệ làm token mới
            const nextChar = code[i + 1]; // Lấy ký tự tiếp theo
            // Xử lý các toán tử quan hệ kép như "==", "<=", ">=", "!="
            if (nextChar && isRelop(char + nextChar)) {
                currentToken += nextChar; // Ghép hai ký tự thành toán tử kép
                i++;  // Tăng chỉ số để bỏ qua ký tự tiếp theo
            }
            addToken(currentToken);  // Thêm vào mảng
            currentToken = '';       // Đặt lại token hiện tại
        }
        // Kiểm tra nếu ký tự là toán tử logic AND
        else if (isLogicalAnd(char)) {
            addToken(currentToken);  // Thêm token hiện tại
            currentToken = char;     // Gán toán tử logic AND làm token mới
            const nextChar = code[i + 1]; // Lấy ký tự tiếp theo
            if (nextChar && nextChar === '&') {
                currentToken += nextChar; // Ghép hai ký tự thành toán tử "&&"
                i++;  // Tăng chỉ số để bỏ qua ký tự tiếp theo
            }
            addToken(currentToken);  // Thêm vào mảng
            currentToken = '';       // Đặt lại token hiện tại
        }
        // Kiểm tra nếu ký tự là toán tử logic OR
        else if (isLogicalOr(char)) {
            addToken(currentToken);  // Thêm token hiện tại
            currentToken = char;     // Gán toán tử logic OR làm token mới
            const nextChar = code[i + 1]; // Lấy ký tự tiếp theo
            if (nextChar && nextChar === '|') {
                currentToken += nextChar; // Ghép hai ký tự thành toán tử "||"
                i++;  // Tăng chỉ số để bỏ qua ký tự tiếp theo
            }
            addToken(currentToken);  // Thêm vào mảng
            currentToken = '';       // Đặt lại token hiện tại
        }
        // Kiểm tra nếu ký tự là toán tử logic NOT
        else if (isLogicalNot(char)) {
            const nextChar = code[i + 1]; // Lấy ký tự tiếp theo
            // Kiểm tra xem ký tự tiếp theo có phải là '=' để xử lý "!="
            if (nextChar && nextChar === '=') {
                currentToken = char + nextChar; // Ghép thành toán tử "!="
                i++;  // Tăng chỉ số để bỏ qua ký tự tiếp theo
                addToken(currentToken);  // Thêm vào mảng
                currentToken = '';       // Đặt lại token hiện tại
            } else {
                // Nếu không có '=', chỉ là toán tử logic NOT
                addToken(currentToken);  // Thêm token hiện tại
                currentToken = char;     // Gán toán tử logic NOT làm token mới
                addToken(currentToken);  // Thêm vào mảng
                currentToken = '';       // Đặt lại token hiện tại
            }
        }
        // Nếu ký tự là số hoặc thuộc dạng số khoa học
        else {
            currentToken += char;  // Ghép các ký tự liên tiếp thành token
            const nextChar = code[i + 1]; // Ký tự tiếp theo

            // Nếu đã hết chuỗi hoặc ký tự tiếp theo không phải là một phần của số
            if (!nextChar || isDelimiter(nextChar) || isWhitespace(nextChar)) {
                if (isNumber(currentToken)) {  // Kiểm tra nếu token là số hợp lệ
                    addToken(currentToken);   // Thêm token là số hợp lệ vào mảng
                } else {
                    addToken(currentToken);  // Xử lý như token thông thường
                }
                currentToken = ''; // Đặt lại token hiện tại
            }
        }
    }

    addToken(currentToken); // Thêm token cuối cùng vào mảng nếu còn
    return tokens; // Trả về mảng chứa các token đã phân tách
};

export { tokenize };
