function averageWordLength(str) {
    const arr = str.replace(/[.,!]/ig, "").split(" ").map(cv => cv.length)
    return (arr.reduce((a,cv) => a+cv,0) / arr.length).toFixed(2)
}
// console.log(averageWordLength("A B C."))
// console.log(averageWordLength("Dude, this is so awesome!"))

function canAlternate(s) {
    const z = []
    const one = []
    s.split("").forEach(cv => cv === "0" ? z.push(cv) : one.push(cv))
    console.log(z,one)
}
console.log(canAlternate("0001111"))