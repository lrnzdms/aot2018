
const fs = require("fs");
const lineReader = require("readline")
const reader = lineReader.createInterface({
    input: fs.createReadStream("./src/03/input")
});
const INPUT = [];
const SHEET = [];

reader.on("line", l => {
    const data = l.split("@");
    const values = data[1].split(":");
    const arr = [];
    
    const o = values[0].split(",");
    arr.push(parseInt(o[0]))
    arr.push(parseInt(o[1]))
    
    const d = values[1].split("x");
    arr.push(parseInt(d[0]))
    arr.push(parseInt(d[1]))
    
    const id = parseInt(data[0].split("#")[1])
    arr.push(id)
    INPUT.push(arr)

    for (let x = 0; x < arr[2]; ++x)
        for (let y = 0; y < arr[3]; ++y)
            add(arr[0] + x, arr[1] + y)
})

reader.on("close", () => {
    getSize();
    getSingle();
})

const getSize = () => {
    let count = 0;    
    SHEET.forEach(x => {
        if (!x) x = [];
        count += x.filter(y => y && y > 1).length
    })

    console.log("Square inches: " + count)
}

const getSingle = () => {
    const checkForOne = (x, y) => SHEET[x][y] == 1;

    INPUT.forEach(arr => {
        for (let x = 0; x < arr[2]; ++x) {
            for (let y = 0; y < arr[3]; ++y) {
                if (!checkForOne(arr[0] + x, arr[1] + y)) 
                    return
            }
        }
        
        console.log("Single use: " + arr[4]);
    })
}

const add = (x, y) => {
    if (!SHEET[x]) SHEET[x] = [];

    if (SHEET[x][y]) SHEET[x][y] += 1;
    else SHEET[x][y] = 1;
}