// utils.js

const isLetter = (char) => {
    return (char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z');
};

const isDigit = (char) => {
    return char >= '0' && char <= '9';
};

const isInArray = (element, array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === element) {
            return true;
        }
    }
    return false;
};

export { isLetter, isDigit, isInArray };
