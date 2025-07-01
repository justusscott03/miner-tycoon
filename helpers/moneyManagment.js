// Number abbreviation for money counting, credit to Electric Dolphin ⚡️🐬 (@Dolphin0002)
const numberLetters = ["K", "B", "M", "T", "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak"];

/**
 * Estimates the exponent (power of ten) of a given number when expressed in scientific notation.
 * @param { number } num - The number whose exponent is being extracted.
 * @returns { string|number } The exponent as a string if scientific notation is used; otherwise, the length of the number minus one.
 */
function tenthRoot (num) {
    const numStr = num.toString();
    if (numStr[1] === ".") {
        return numStr.substring(numStr.indexOf("e") + 2);
    } 
    else if (numStr[1] === "e") {
        return numStr.substring(3);
    } 
    else {
        return numStr.length - 1;
    }
}

/**
 * Abbreviates a large number to a shorter format (e.g., `1,000,000` → `1M`, `10,000,000,000,000` → `10T`).
 * @param { number } num - The number to abbreviate.
 * @param { boolean } forceZeroes - Whether to display trailing zeroes (up to four significant digits).
 * @returns { string } The abbreviated number string.
 */
function abbreviateNum (num, forceZeroes) {
    if (num < 1000) {
        return num.toString();
    }
    let numStr = num.toString();
    let numStrArr = numStr.split("");
    let numPow = numStr.length - 1;
    if (numStrArr[1] === ".") {
        numPow = numStr.substring(numStrArr.indexOf("e") + 2);
        numStrArr.splice(1, 1);
    }
    if (numStrArr[1] === "e") {
        numPow = numStr.substring(3);
        numStrArr = [numStrArr[0], 0, 0, 0];
    }
    numStr = numStrArr.join("");
    let newNumStr = numStr.slice(0, numPow % 3 + 1) + "." + numStr.slice(numPow % 3 + 1);
    if (!forceZeroes) {
        let newNumArr = newNumStr.substr(0, 5).split("");
        for (let i = newNumArr.length - 1; i >= 0; i--) {
            if (newNumArr[i] !== "0") {
                break;
            } 
            else {
                newNumArr.splice(i, 1);
            }
        }
        if (newNumArr[newNumArr.length - 1] === ".") {
            newNumArr.splice(newNumArr.length - 1, 1);
        }
        newNumStr = newNumArr.join("");
    }
    return newNumStr.substr(0, 5) + numberLetters[floor(numPow/3) - 1];
}

const money = {
    total : 0,
    super : 0
};

export { abbreviateNum, money };
