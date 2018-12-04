
const fs = require("fs");
const lineReader = require("readline")
const reader = lineReader.createInterface({
    input: fs.createReadStream("./src/04/input")
});
let INPUT = [];
let DATA = [];

reader.on("line", l => {
    const split = l.split("]");

    const x = split[0].substr(6, split[0].length - 6).split(" ")    
    const date = parseInt( x[0].split("-").join("") );
    const minute = parseInt( x[1].split(":").join("") );
        
    let info = "ERROR";    
    if (split[1].startsWith(" f")) {
        info = "down"
    } else if (split[1].startsWith(" w")) {
        info = "up"
    } else {
        info = split[1].split(" ")[2];
    }

    INPUT.push([date, minute, info])
})


reader.on("close", () => {
    processData();
    DATA.forEach(computeTotalEntry);
    strategy1();
    strategy2();
})

const strategy1 = () => {
    let max = {sum: -1};
    DATA.forEach(d => {
        if (d.sum > max.sum) {
            max = d;
        }
    });

    console.log(max)
    console.log(max.id * max.minute)
}

const strategy2 = () => {
    let max = {freq: -1};
    DATA.forEach(d => {
        if (d.freq > max.freq) {
            max = d;
        }
    });

    console.log(max)
    console.log(max.id * max.minute)
}

computeTotalEntry = (entry) => {
    const reduced = entry.data.reduce((a,b) => {
        const schedule = a.schedule.map((s,i) => s + b.schedule[i]);
        return {date: -1, schedule: schedule};
    })

    const sum = reduced.schedule.reduce((a,b) => a + b);
    let max = [-1, -1];
    reduced.schedule.forEach((s, i) => {
        if (s > max[0]) max = [s, i];
    })
    entry["sum"] = sum;
    entry["freq"] = max[0];
    entry["minute"] = max[1];
}

processData = () => {
    INPUT = INPUT.sort((a, b) => {

        let i = 0;
        let x = -1;
        let y = -1;

        while( x == y ) {
            x = a[i]
            y = b[i];
            i++;

            if (i == 4) return -1;
        }

        return x - y;
    });

    let i = 0;
    let id = -1;
    while(i < INPUT.length) {
        const date = INPUT[i][0];
        const info = INPUT[i][2];

        if (info.startsWith("#")) {
            
            id = parseInt(info.substr(1, info.length - 1))

        } else if (info.startsWith("d")) {
            let d = getDateEntry(id, date);
            let down = INPUT[i][1];
            i++;
            let up = INPUT[i][1];
            for (let j = down; j < up; ++j) {
                d.schedule[j] += 1;
            }
        } else {
            throw new Error("Unknown input: " + info)
        }

        i++;
    }

    //DATA.forEach(t => console.log(t))
}

getDateEntry = (id, date) => {
    let entry = DATA.find(x => x.id == id);
    if (!entry) {
        entry = { id: id, data:[] }
        DATA.push(entry);
    }

    let d = entry.data.find(d => d.date == date);
    if (!d) {
        let schedule = [];
        for (let i = 0; i < 60; ++i) schedule.push(0);
        d = {date: date, schedule: schedule};
        entry.data.push(d);
    }

    return d;
}
