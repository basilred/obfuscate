const assert = require('chai').assert;
const obfuscator = require('../obfuscate');
const util = require('util');

describe('Обфускатор', function () {

    const data = ['div', 'div', 'cl1', 'div'];
    const model = {
        div: 'a',
        cl1: 'b'
    };
    describe(`возвращает объект, построенный по массиву`, function () {
        it(`на входящий массив ${data} возвращает объект ${ util.inspect(model) }`, function () {
            assert.deepEqual( obfuscator(data), model );
        });
    });

});
