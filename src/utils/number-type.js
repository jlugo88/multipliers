const range = require('./range')

const valueFunctions = {
    0: number => number,
    1: number => 'Type 1',
    10: number => 'Type 2',
    11: number => 'Type 3',
}

const getKey = (multiploTres, multiploCinco) => {
    const tres = Number(multiploTres)
    const cinco = Number(multiploCinco)
    return 10 * cinco + tres
}

const getNumberValue = (number) => {
    const tres = isMultiploTres(number)
    const cinco = isMultiploCinco(number)

    const key = getKey(tres, cinco)

    return valueFunctions[key](number)
}

const getRangeValue = (range) => {
    return range.map(element => {
        return getNumberValue(element)
    })
}

const printPartOne = () => {
    const numbers = range.createRange()
    const values = getRangeValue(numbers)
    values.forEach(element => {
        console.log(element)
    })
}

const isMultiploTres = (number) => {
    return number % 3 == 0
}
const isMultiploCinco = (number) => {
    return number % 5 == 0
}

module.exports = {
    getNumberValue,
    printPartOne
}