export class MoneyFormatter {
    static tenthRoot(num) {
        const numStr = num.toString();
        if (numStr[1] === ".") {
            return parseInt(numStr.substring(numStr.indexOf("e") + 2));
        }
        else if (numStr[1] === "e") {
            return parseInt(numStr.substring(3));
        }
        else {
            return numStr.length - 1;
        }
    }
    static abbreviate(num, forceZeroes = false) {
        if (num < 1000) {
            return num.toString();
        }
        let numStr = num.toString();
        let numArr = numStr.split("");
        let numPow = numStr.length - 1;
        if (numArr[1] === ".") {
            numPow = parseInt(numStr.substring(numArr.indexOf("e") + 2));
            numArr.splice(1, 1);
        }
        if (numArr[1] === "e") {
            numPow = parseInt(numStr.substring(3));
            numArr = [numArr[0], "0", "0", "0"];
        }
        numStr = numArr.join("");
        let newNumStr = numStr.slice(0, numPow % 3 + 1) +
            "." +
            numStr.slice(numPow % 3 + 1);
        if (!forceZeroes) {
            let trimmed = newNumStr.substr(0, 5).split("");
            for (let i = trimmed.length - 1; i >= 0; i--) {
                if (trimmed[i] !== "0")
                    break;
                trimmed.splice(i, 1);
            }
            if (trimmed[trimmed.length - 1] === ".") {
                trimmed.pop();
            }
            newNumStr = trimmed.join("");
        }
        const suffixIndex = Math.floor(numPow / 3) - 1;
        return newNumStr.substr(0, 5) + MoneyFormatter.numberLetters[suffixIndex];
    }
}
MoneyFormatter.numberLetters = [
    "K", "B", "M", "T",
    "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak"
];
