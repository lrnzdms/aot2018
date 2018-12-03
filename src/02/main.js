
const fs = require("fs");
const lineReader = require("readline")
const reader = lineReader.createInterface({
    input: fs.createReadStream("./src/02/input")
});
const INPUT = [];
reader.on("line", l => INPUT.push(l.split('')))
reader.on("close", () => {
    const pairs = INPUT.map(l => analizeLine(l, 2)).filter(l => l).length;
    const tripples = INPUT.map(l => analizeLine(l, 3)).filter(l => l).length;
    console.log("Pairs: " + pairs)
    console.log("Tripples: " + tripples)
    console.log("Checksum: " + (pairs * tripples))

    commons();
})

const analizeLine = (l, count) => {
    const arr = [];
    l.forEach(c => {
        const entry = arr.find(a => a[0] == c);
        if (entry) entry[1] += 1;
        else arr.push([c, 1])
    })

    return arr.filter(a => a[1] == count).length > 0;
}

const commons = () => {
    INPUT.forEach((l, i) => {
        INPUT.forEach((ll, ii) => {
            if (ii != i) commonLine(l, ll)
        })
    })
}

const commonLine = (l, ll) => {
    let strike = -1;
    for (let i = 0; i < l.length; ++i) {
        if (l[i] != ll[i]) {
            if (strike != -1)
            return;
            
            strike = i;
        }
    }

    const commons = l.filter((x, i) => i != strike);

    console.log("Commons: " + commons.join(""));
}