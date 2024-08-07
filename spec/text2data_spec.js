const text2data = require('../dist/text2data'),
    fs = require('fs')

const testText = fs.readFileSync(__dirname + '/../test-data/dummy.txt').toString(),
    testTextDpcm = fs.readFileSync(__dirname + '/../test-data/dummy_dpcm.txt').toString(),
    expectedOutputCa65 = fs.readFileSync(__dirname + '/../test-data/dummy.s').toString(),
    expectedOutputAsm6 = fs.readFileSync(__dirname + '/../test-data/dummy.asm').toString(),
    expectedOutputCa65D = fs.readFileSync(__dirname + '/../test-data/dummy_dpcm.s').toString(),
    expectedOutputAsm6D = fs.readFileSync(__dirname + '/../test-data/dummy_dpcm.asm').toString(),
    expectedDpcmData = new Uint8Array(fs.readFileSync(__dirname + '/../test-data/dummy_dpcm.dmc'));

const testFiles = fs.readdirSync(__dirname + '/../test-data/'),
    ca65SingleFiles = testFiles.filter(a => a.startsWith('dummy_dpcm_') && a.indexOf('ch') === -1 && a.endsWith('.s')).sort()
        .map(f => fs.readFileSync(__dirname + '/../test-data/' + f).toString()),
    asm6SingleFiles = testFiles.filter(a => a.startsWith('dummy_dpcm_') && a.indexOf('ch') === -1 && a.endsWith('.asm')).sort()
        .map(f => fs.readFileSync(__dirname + '/../test-data/' + f).toString());

const channelTestCa65 = testFiles.filter(f => f.startsWith('dummy_dpcm_ch') && f.endsWith('.s')).sort(),
    channelTestAsm6 = testFiles.filter(f => f.startsWith('dummy_dpcm_ch') && f.endsWith('.asm')).sort(),
    channelTestDataCa65 = channelTestCa65.map(f => fs.readFileSync(__dirname + '/../test-data/' + f).toString()),
    channelTestDataAsm6 = channelTestAsm6.map(f => fs.readFileSync(__dirname + '/../test-data/' + f).toString());

// NOTE: These aren't really the best tests ever, this just validates the output matches what the
// windows binary produces. The string parsing could be separated into different tests. This is
// sort of a quick-and-dirty solution, improvements welcome.

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

    it('Compiles dpcm txt to expected asm (ca65)', async () => {
        const results = await text2data(testTextDpcm, {assembler: 'ca65', musicName: 'dummy_dpcm'})
        expect(results).toEqual({
            songs: 2,
            size: 391, 
            dpcmSize: 1408,
            dpcmData: expectedDpcmData,
            data: expectedOutputCa65D
        })
    })

    it('Compiles dpcm txt to expected asm (asm6)', async () => {
        const results = await text2data(testTextDpcm, {assembler: 'asm6', musicName: 'dummy_dpcm'})
        expect(results).toEqual({
            songs: 2,
            size: 391, 
            dpcmSize: 1408,
            dpcmData: expectedDpcmData,
            data: expectedOutputAsm6D
        })
    })

    it('Compiles dpcm txt to expected asm, with separate files (ca65)', async () => {
        const results = await text2data(testTextDpcm, {assembler: 'ca65', musicName: 'dummy_dpcm', separateFiles: true})
        expect(results).toEqual({
            songs: 2,
            size: 622, 
            dpcmSize: 1408,
            dpcmData: expectedDpcmData,
            data: ca65SingleFiles
        })
    })

    it('Compiles dpcm txt to expected asm, with separate files (asm6)', async () => {
        const results = await text2data(testTextDpcm, {assembler: 'asm6', musicName: 'dummy_dpcm', separateFiles: true})
        expect(results).toEqual({
            songs: 2,
            size: 622, 
            dpcmSize: 1408,
            dpcmData: expectedDpcmData,
            data: asm6SingleFiles
        })
    })

    it('Compiles 1 channel dpcm correctly (cc65)', async () => {
        const results = await text2data(testTextDpcm, {assembler: 'ca65', musicName: 'dummy_dpcm', channels: 1})
        expect(results).toEqual({
            songs: 2,
            size: 301, 
            dpcmSize: 1408,
            dpcmData: expectedDpcmData,
            data: channelTestDataCa65[0]
        })
    })

    it('Compiles 2 channel dpcm correctly (cc65)', async () => {
        const results = await text2data(testTextDpcm, {assembler: 'ca65', musicName: 'dummy_dpcm', channels: 2})
        expect(results).toEqual({
            songs: 2,
            size: 326, 
            dpcmSize: 1408,
            dpcmData: expectedDpcmData,
            data: channelTestDataCa65[1]
        })
    })

    it('Compiles 3 channel dpcm correctly (cc65)', async () => {
        const results = await text2data(testTextDpcm, {assembler: 'ca65', musicName: 'dummy_dpcm', channels: 3})
        expect(results).toEqual({
            songs: 2,
            size: 349, 
            dpcmSize: 1408,
            dpcmData: expectedDpcmData,
            data: channelTestDataCa65[2]
        })
    })

    it('Compiles 4 channel dpcm correctly (cc65)', async () => {
        const results = await text2data(testTextDpcm, {assembler: 'ca65', musicName: 'dummy_dpcm', channels: 4})
        expect(results).toEqual({
            songs: 2,
            size: 367, 
            dpcmSize: 1408,
            dpcmData: expectedDpcmData,
            data: channelTestDataCa65[3]
        })
    })

    it('Compiles 5 channel dpcm correctly (cc65)', async () => {
        const results = await text2data(testTextDpcm, {assembler: 'ca65', musicName: 'dummy_dpcm', channels: 5})
        expect(results).toEqual({
            songs: 2,
            size: 391, 
            dpcmSize: 1408,
            dpcmData: expectedDpcmData,
            data: expectedOutputCa65D // Same as normal
        })
    })

    it('Compiles 1 channel dpcm correctly (asm6)', async () => {
        const results = await text2data(testTextDpcm, {assembler: 'asm6', musicName: 'dummy_dpcm', channels: 1})
        expect(results).toEqual({
            songs: 2,
            size: 301, 
            dpcmSize: 1408,
            dpcmData: expectedDpcmData,
            data: channelTestDataAsm6[0]
        })
    })

    it('Compiles 2 channel dpcm correctly (asm6)', async () => {
        const results = await text2data(testTextDpcm, {assembler: 'asm6', musicName: 'dummy_dpcm', channels: 2})
        expect(results).toEqual({
            songs: 2,
            size: 326, 
            dpcmSize: 1408,
            dpcmData: expectedDpcmData,
            data: channelTestDataAsm6[1]
        })
    })

    it('Compiles 3 channel dpcm correctly (asm6)', async () => {
        const results = await text2data(testTextDpcm, {assembler: 'asm6', musicName: 'dummy_dpcm', channels: 3})
        expect(results).toEqual({
            songs: 2,
            size: 349, 
            dpcmSize: 1408,
            dpcmData: expectedDpcmData,
            data: channelTestDataAsm6[2]
        })
    })

    it('Compiles 4 channel dpcm correctly (asm6)', async () => {
        const results = await text2data(testTextDpcm, {assembler: 'asm6', musicName: 'dummy_dpcm', channels: 4})
        expect(results).toEqual({
            songs: 2,
            size: 367, 
            dpcmSize: 1408,
            dpcmData: expectedDpcmData,
            data: channelTestDataAsm6[3]
        })
    })

    it('Compiles 5 channel dpcm correctly (asm6)', async () => {
        const results = await text2data(testTextDpcm, {assembler: 'asm6', musicName: 'dummy_dpcm', channels: 5})
        expect(results).toEqual({
            songs: 2,
            size: 391, 
            dpcmSize: 1408,
            dpcmData: expectedDpcmData,
            data: expectedOutputAsm6D // Same as normal
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