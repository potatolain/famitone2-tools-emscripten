const nesasmc = require('../dist/nesasmc'),
    fs = require('fs')

const testInput = fs.readFileSync(__dirname + '/../test-data/background.asm').toString(),
    expectedOutputCa65 = fs.readFileSync(__dirname + '/../test-data/background.s').toString(),
    expectedOutputAsm6 = fs.readFileSync(__dirname + '/../test-data/background_asm6.asm').toString();

// NOTE: These aren't really the best tests ever, this just validates the output matches what the
// windows binary produces. The string parsing could be separated into different tests. This is
// sort of a quick-and-dirty solution, improvements welcome.

describe('nesasmc', () => {
    it('Converts basic file as expected', async () => {
        const results = await nesasmc(testInput)
        expect(results).toEqual({
            ca65: expectedOutputCa65,
            asm6: expectedOutputAsm6
        })
    })

    it('Fails on empty file', async() => {
        await expectAsync(nesasmc(null)).toBeRejectedWithError(Error, /null or undefined/)
        await expectAsync(nesasmc('')).toBeRejectedWithError(Error, /null or undefined/)
        await expectAsync(nesasmc(25)).toBeRejectedWithError(Error, /as a text string/)

    })

})