const nsf2data = require('../dist/nsf2data'),
    fs = require('fs')

const testNsf = Uint8Array.from(fs.readFileSync(__dirname + '/../test-data/sfx.nsf')),
    expectedOutputCa65All = fs.readFileSync(__dirname + '/../test-data/sfx-both.s').toString(),
    expectedOutputAsm6All = fs.readFileSync(__dirname + '/../test-data/sfx-both.asm').toString(),
    expectedOutputCa65Ntsc = fs.readFileSync(__dirname + '/../test-data/sfx-ntsc.s').toString(),
    expectedOutputAsm6Ntsc = fs.readFileSync(__dirname + '/../test-data/sfx-ntsc.asm').toString(),
    expectedOutputCa65Pal = fs.readFileSync(__dirname + '/../test-data/sfx-pal.s').toString(),
    expectedOutputAsm6Pal = fs.readFileSync(__dirname + '/../test-data/sfx-pal.asm').toString()

// NOTE: These aren't really the best tests ever, this just validates the output matches what the
// windows binary produces. The string parsing could be separated into different tests. This is
// sort of a quick-and-dirty solution, improvements welcome.

describe('nsf2data', () => {
    it('Compiles a simple nsf to expected asm (ca65 - both)', async () => {
        const results = await nsf2data(testNsf)
        expect(results).toEqual({
            effects: 11,
            size: 828, 
            data: expectedOutputCa65All
        })
    })

    it('Compiles a simple nsf to expected asm (asm6 - both)', async () => {
        const results = await nsf2data(testNsf, {assembler: 'asm6'})
        expect(results).toEqual({
            effects: 11,
            size: 828, 
            data: expectedOutputAsm6All
        })
    })

    it('Compiles a simple nsf to expected asm (ca65 - ntsc)', async () => {
        const results = await nsf2data(testNsf, {assembler: 'ca65', ntscOnly: true})
        expect(results).toEqual({
            effects: 11,
            size: 429, 
            data: expectedOutputCa65Ntsc
        })
    })

    it('Compiles a simple nsf to expected asm (asm6 - ntsc)', async () => {
        const results = await nsf2data(testNsf, {assembler: 'asm6', ntscOnly: true})
        expect(results).toEqual({
            effects: 11,
            size: 429, 
            data: expectedOutputAsm6Ntsc
        })
    })

    it('Compiles a simple nsf to expected asm (ca65 - pal)', async () => {
        const results = await nsf2data(testNsf, {assembler: 'ca65', palOnly: true})
        expect(results).toEqual({
            effects: 11,
            size: 403, 
            data: expectedOutputCa65Pal
        })
    })

    it('Compiles a simple nsf to expected asm (asm6 - pal)', async () => {
        const results = await nsf2data(testNsf, {assembler: 'asm6', palOnly: true})
        expect(results).toEqual({
            effects: 11,
            size: 403, 
            data: expectedOutputAsm6Pal
        })
    })

    it('Fails on unknown compiler', async() => {
        await expectAsync(nsf2data(testNsf, {assembler: 'gcc'})).toBeRejectedWithError(Error, /Unknown assembler\: gcc/)
    })

    it('Fails if data is passed in an unsupported format', async () => {
        await expectAsync(nsf2data("honk", {})).toBeRejectedWithError(Error, /uint8Array/)
    })

    it('Fails if empty or missing data is passed', async () => {
        await expectAsync(nsf2data(new Uint8Array(), {})).toBeRejectedWithError(Error, /array appears to be empty/)
        await expectAsync(nsf2data(null, {})).toBeRejectedWithError(Error, /null or undefined/)
    })

})