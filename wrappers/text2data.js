async function text2data(textData, options) {
    
    function logVerbose() {
        if (options.verbose) {
            console.info('[verbose]', ...arguments)
        }
    }

    if (!textData) { 
        throw new Error('Text data is null or undefined')
    }
    if (typeof textData !== 'string') {
        throw new Error('Text data must be a string')
    }
    if (!textData.length) {
        throw new Error('Text file appears to be empty')
    }

    options = {
        assembler: 'ca65',
        musicName: 'music',
        ...(options ?? {})
    }
    const additionalArgs = []

    if (options.separateFiles) {
        additionalArgs.push('-s')
    }

    if (typeof options.channels !== 'undefined') {
        if (typeof options.channels !== 'number') {
            throw new Error('Number of channels must be a number between 1 and 5')
        }
        if (options.channels < 1 || options.channels > 5) {
            throw new Error('Number of channels must be between 1 and 5')
        }
        additionalArgs.push(`-ch${options.channels}`)
    }

    if (typeof options.musicName !== 'string' || options.musicName.length < 1 || !/^\w+$/.test(options.musicName)) {
        throw new Error('Music name must be a non-empty alphanumeric string')
    }

    let outputFile
    if (['asm6', 'ca65'].indexOf(options.assembler) !== -1) {
        additionalArgs.push(`-${options.assembler}`)
        outputFile = options.musicName + (options.assembler === 'asm6' ? '.asm' : '.s')
    } else {
        throw new Error(`Unknown assembler: ${options.assembler}. Options are ca65 and asm6.`)
    }
    
    const createModule = require('./emscripten/text2data')
    let stdout = ''
    const Module = await createModule({
        print: str => { 
            stdout += str + '\n'
            logVerbose('[stdout]', str) 
        },
        setStatus: status => logVerbose('Status updated to', status)
    })

    // This is a bit duct-tape-y but I can't be bothered to do it right. Clear stdout
    // before we run a second time. (This could be avoided by changing how we export things in emscripten)
    stdout = ''

    Module.FS.writeFile(`${options.musicName}.txt`, textData)
    logVerbose('Sending arguments', JSON.stringify([`${options.musicName}.txt`, ...additionalArgs]))
    Module.callMain([`${options.musicName}.txt`, ...additionalArgs])

    // Parse stdout to send some meta information over
    const stdoutBreaks = stdout.split('\n').map(l => l.trim())

    let size = 0
    let data
    const songLines = stdoutBreaks.filter(l => l.startsWith('Sub song'))
    const songs = songLines.length

    if (!options.separateFiles) {
        const successLine = stdoutBreaks.find(ln => ln.startsWith('Total data size'))
        if (!successLine) {
            throw new Error('Conversion failed! Error output follows: \n' + stdout)
        }
        size = parseInt(successLine.substring(16), 10)
        logVerbose('Trying to read from', outputFile)
        data = Module.FS.readFile(outputFile, { encoding: 'utf8' })
    } else {
        if (songs <= 0) {
            throw new Error('Conversion failed! Error output follows: \n' + stdout)
        }
        songLines.forEach(v => size += parseInt(v.substring(11), 10))
        logVerbose('Trying to read', songs, 'files from', outputFile, 'and numberic extensions')
        data = songLines.map((_, songNo) => Module.FS.readFile(outputFile.replace('.', `_${songNo}.`), { encoding: 'utf8'}))
    }

    const dpcmLine = stdoutBreaks.find(ln => ln.startsWith('DPCM samples:'))
    const dpcmSize = parseInt(dpcmLine.substring(14), 10)

    let dpcmData = new Uint8Array()
    if (dpcmSize > 0) {
        dpcmData = Module.FS.readFile(options.musicName + '.dmc')
    }

    return {
        data,
        size,
        dpcmSize,
        dpcmData,
        songs
    }
}

if (typeof window !== 'undefined') { window.text2data = text2data }
if (typeof module !== 'undefined') { module.exports = text2data }