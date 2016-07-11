'use strict';

/**
 * @param  {Array}  data   - массив CSS классов
 * @return {Object} result - объект с ключами в виде имён классов, и в качестве
 *                         значения — новое значение имени класса.
 */
module.exports = function (data) {
    let result = {
        input: data
    };

    let newSelectors = {};

    for (let i = 0; i < data.length; i++) {
        if (data[i] in newSelectors) {
            newSelectors[data[i]] += 1;
        } else {
            newSelectors[data[i]] = 1;
        }
    }

    let selectorsArray = [];
    for (let selector in newSelectors) {
        selectorsArray.push({
            baseSelector: selector,
            weight: newSelectors[selector]
        });
    }

    selectorsArray.sort((selA, selB) => selB.weight - selA.weight);

    // const vocabulary = 'abcdefghijklmnopqrstuvwxyz-_0123456789';
    const vocabulary = 'abc';
    let basePosition = 0,
        selectorLenght = 1,
        // positions = [].push(0),
        globalCounter = 0,
        currentSelector = '';

    function nextLetter(arr, pos, numLimit) {
        const position = arr.length - 1;
        const lastNum = arr[pos];
        if (lastNum >= numLimit) {
            arr[pos] = 0;
            if (pos === 0) {
                return arr.push(0);
            }
            nextLetter(arr, pos - 1, numLimit);
        }
        arr[pos] += 1;
        console.log(arr.map(item => vocabulary[item]));
        return arr;
    }

    function getNewSelector(length) {
        if (basePosition > 25) {
            basePosition = 0;
            selectorLenght += 1;
            positions.push(0);
        }

        if (selectorLenght === 1) {
            return currentSelector = vocabulary[basePosition];
        }

        if (positions[positions.length - 1] > vocabulary.length) {

        }

        let res = vocabulary[basePosition];
        if (positions.length > 1) {

        } else {
            res += vocabulary[basePosition];
        }

        basePosition += 1;
    }

    let positions = [0,0];

    for (let selectorObject of selectorsArray) {
        // selectorObject.newSelector = getNewSelector();
        selectorObject.newSelector = positions.map(function (item) {
            return vocabulary[item];
        });
        positions = nextLetter(positions, positions.length - 1, vocabulary.length - 1);
    }
    console.log(selectorsArray.slice(0, 19));

    result.outputJson = newSelectors;

    return result;
};
