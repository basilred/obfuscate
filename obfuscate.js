'use strict';

/**
 * Словарь из которого берутся символы для конструирования имён классов
 * @type {String}
 */
const vocabulary = 'abcdefghijklmnopqrstuvwxyz-_0123456789';

/**
 * Числовой массив, определяющий позицию каждого символа в конструкторе
 * имён классов
 * @type {Array}
 */
let positions = [0];

/**
 * Функция преобразует элементы массива, чтобы получить новое сочетание чисел,
 * по которому будет строиться имя класса с помощью словаря vocabulary.
 * @param  {Array} arr         числовой массив
 * @param  {Number} pos         текущая проверяемая позиция массива
 * @param  {Number} zeroLimit   лимит для первого (нулевого) символа в массиве
 * @param  {Number} commonLimit общий лимит, равен длине строки vocabulary
 * @return {Array}             итерированный по правилам массив
 */
function nextIter(arr, pos, zeroLimit, commonLimit) {
    const currentPosition = pos;
    const currentValue = arr[currentPosition];
    if (currentPosition === 0) {
        if (currentValue === zeroLimit) {
            arr[currentPosition] = 0;
            arr.push(0);
            return arr;
        }
        arr[currentPosition] += 1;
        return arr;
    }
    if (currentValue === commonLimit) {
        arr[currentPosition] = 0;
        return nextIter(arr, currentPosition - 1, zeroLimit, commonLimit);
    }
    arr[currentPosition] += 1;
    return arr;
}

/**
 * Функция принимает на вход массив классов CSS и возвращает объект
 * с уникальными именами классов вида:
 * {
 *     class1: 'a',
 *     class2: 'b'
 * }
 * Самые короткие (однобуквенные) новые имена получают классы, встречающиеся
 * чаще других.
 * @param  {Array}  data   - массив CSS классов
 * @return {Object} result - объект с ключами в виде имён классов, и в качестве
 *                         значения — новое значение имени класса.
 */
module.exports = function (data) {
    let result = {};

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


    const zeroLimit = 25,
        commonLimit = vocabulary.length - 1;

    for (let selectorObject of selectorsArray) {
        selectorObject.newSelector = positions.map(item => vocabulary[item]).join('');
        result[selectorObject.baseSelector] = selectorObject.newSelector;
        positions = nextIter(positions, positions.length - 1, zeroLimit, commonLimit);
    }

    return result;
};
