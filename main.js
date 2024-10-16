// main.js
import fs from 'fs/promises';  // sử dụng fs/promises để hỗ trợ async
import { tokenize } from './lexer.js';  // nhập hàm tokenize từ lexer.js

// Lấy đường dẫn file .txt từ command line arguments
const filePath = process.argv[2];  // Đường dẫn tới file input

// Kiểm tra xem đường dẫn có hợp lệ không
if (!filePath) {
    console.error('Vui lòng cung cấp đường dẫn đến file .txt input.');
    process.exit(1);
}

// Hàm chính để đọc file và phân tích từ vựng
const main = async () => {
    try {
        // Đọc nội dung file .txt
        const data = await fs.readFile(filePath, 'utf8');
        
        // Phân tích từ vựng (lexical analysis)
        const tokens = tokenize(data);
        
        // In ra các token được phân tích
        tokens.forEach(token => {
            console.log(`${token.type} : ${token.value}`);
        });
    } catch (err) {
        console.error('Lỗi khi đọc file:', err);
    }
};

// Chạy chương trình chính
main();
