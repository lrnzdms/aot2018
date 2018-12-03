
const fs = require("fs");
const lineReader = require("readline")
const reader = lineReader.createInterface({
    input: fs.createReadStream("./src/01/input")
});
const INPUT = [];
reader.on("line", (l) => {
    INPUT.push(Number.parseInt(l));
})
reader.on("close", () => {
    inputSum();
    findDuplicates();
})

// 01 1
const inputSum = () => {
    const sum = INPUT.reduce((p, next) => p + next);
    console.log("Sum: " + sum)
}

// 01 2
const findDuplicates = () => {
    let found = false;
    const intermediates = [0];
    while(!found) {
        INPUT.forEach(n => {
            if (found) return;
            const a = intermediates[intermediates.length - 1] + n;
            if (intermediates.find(i => i == a)) {
                console.log("Duplicate: " + a)
                found = true;
            }
            intermediates.push(a)
        })
    }
}