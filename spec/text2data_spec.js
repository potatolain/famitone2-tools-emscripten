const text2data = require('../dist/text2data'),
    fs = require('fs')

const testText = fs.readFileSync(__dirname + '/../test-data/dummy.txt').toString(),
    testTextDpcm = fs.readFileSync(__dirname + '/../test-data/dummy_dpcm.txt').toString(),
    expectedOutputCa65 = fs.readFileSync(__dirname + '/../test-data/dummy.s').toString(),
    expectedOutputAsm6 = fs.readFileSync(__dirname + '/../test-data/dummy.asm').toString(),
    expectedOutputCa65D = fs.readFileSync(__dirname + '/../test-data/dummy_dpcm.s').toString(),
    expectedOutputAsm6D = fs.readFileSync(__dirname + '/../test-data/dummy_dpcm.asm').toString(),
    expectedDpcmData = new Uint8Array(fs.readFileSync(__dirname + '/../test-data/dummy_dpcm.dmc'));

// NOTE: These aren't really the best tests ever, this just validates the output matches what the
// windows binary produces. The string parsing could be separated into different tests. This is
// sort of a quick-and-dirty solution, improvements welcome.

// FIXME: Add separate file test

// FIXME: Channel test

function writeab(a, b) {
    fs.writeFileSync(__dirname + '/../test-data/a.s', a)
    fs.writeFileSync(__dirname + '/../test-data/b.s', b)
}

describe('text2data', () => {
    it('Compiles a simple txt to expected asm (ca65)', async () => {
        const results = await text2data(testText, {assembler: 'ca65', musicName: 'dummy'})
        writeab(results.data, expectedOutputCa65)
        expect(results).toEqual({
            songs: 1,
            size: 86, 
            dpcmSize: 0,
            dpcmData: new Uint8Array(),
            data: expectedOutputCa65
        })
    })

    it('Compiles a simple txt to expected asm (asm6)', async () => {
        const results = await text2data(testText, {assembler: 'asm6', musicName: 'dummy'})
        expect(results).toEqual({
            songs: 1,
            size: 86, 
            dpcmSize: 0,
            dpcmData: new Uint8Array(),
            data: expectedOutputAsm6
        })
    })

    it('Compiles a simple txt to expected asm (ca65)', async () => {
        const results = await text2data(testTextDpcm, {assembler: 'ca65', musicName: 'dummy_dpcm'})
        writeab(results.data, expectedOutputCa65)
        expect(results).toEqual({
            songs: 2,
            size: 391, 
            dpcmSize: 1408,
            dpcmData: expectedDpcmData,
            data: expectedOutputCa65D
        })
    })

    it('Compiles a simple txt to expected asm (asm6)', async () => {
        const results = await text2data(testTextDpcm, {assembler: 'asm6', musicName: 'dummy_dpcm'})
        expect(results).toEqual({
            songs: 2,
            size: 391, 
            dpcmSize: 1408,
            dpcmData: expectedDpcmData,
            data: expectedOutputAsm6D
        })
    })


    it('Fails on unknown compiler', async() => {
        await expectAsync(text2data(testText, {assembler: 'gcc'})).toBeRejectedWithError(Error, /Unknown assembler\: gcc/)
    })

    it('Fails if data is passed in an unsupported format', async () => {
        await expectAsync(text2data(['goldfish'], {})).toBeRejectedWithError(Error, /string/)
    })

    it('Fails if empty or missing data is passed', async () => {
        await expectAsync(text2data('', {})).toBeRejectedWithError(Error, /null or undefined/)
        await expectAsync(text2data(null, {})).toBeRejectedWithError(Error, /null or undefined/)
    })

    it('Fails on invalid number of channels', async () => {
        await expectAsync(text2data(testText, {channels: 6})).toBeRejectedWithError(Error, /between 1 and 5/)
        await expectAsync(text2data(testText, {channels: 0})).toBeRejectedWithError(Error, /between 1 and 5/)
    })

    it('Fails on bad musicName values', async () => {
        await expectAsync(text2data(testText, {musicName: ''})).toBeRejectedWithError(Error, /non-empty alphanumeric string/)
        await expectAsync(text2data(testText, {musicName: 5})).toBeRejectedWithError(Error, /non-empty alphanumeric string/)
        await expectAsync(text2data(testText, {musicName: 'panda.txt'})).toBeRejectedWithError(Error, /non-empty alphanumeric string/)
    })

})