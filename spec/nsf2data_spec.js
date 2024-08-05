const nsf2data = require('../dist/nsf2data')

describe('nsf2data', () => {
    it('Compiles a simple nsf to expected file (ca65)', async () => {
        expect(await nsf2data('dummy text', {})).toEqual('five')
    })
})