
const fs = require("fs");
const lineReader = require("readline")
const reader = lineReader.createInterface({
    input: fs.createReadStream("./src/05/input")
});

let INPUT = [];

const EMPTY = 0;
const DIFF = 32;
const START = 65
const LENGTH = 26;

reader.on("line", l => {    
    for (let i = 0; i < l.length; ++i)
        INPUT.push( l.charCodeAt(i) )
})


reader.on("close", () => {
    const results = [];
    for (let i = START; i < START + LENGTH; ++i) {
        let data = remove(i);
        let result = react(data);
        results.push([i, result]);
    }

    console.log(results)
})

const remove = (charcode) => {
    return INPUT.map(i => (i == charcode || i == charcode + DIFF) ? 0 : i)
}

const react = (data) => {

    const eq = (a,b) => Math.abs(data[a]-data[b]) == DIFF;

    const nextIndex = (index) => {
        while (data[++index] == EMPTY) {}
        if (index > data.length) index = -1;
        return index;
    }

    let iteration = 0;
    let count = 0;
    let lastCount = -1;
    while(count != lastCount) {
        
        console.log("Iteration: " + ++iteration)
        
        let cur = 0;
        let next = nextIndex(cur);
        static = true;

        while (next != -1) {
            if ( eq(cur, next) ) {
                //console.log(iteration + " Replacing index: " + cur + " and " + next)
                data[cur] = 0;
                data[next] = 0;
                static = false;

                cur = next + 1;
                next = nextIndex(cur);
            } else {
                cur = next;
                next = nextIndex(cur);
            }
        }

        lastCount = count;
        count = data.filter(i => i != 0).length;
        console.log("current count: " + count)
    }

    const result = data.filter(i => i != 0);
    return result.length;
}


