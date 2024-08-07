async function nsf2data(nsfData, options) {
    
    function logVerbose() {
        if (options.verbose) {
            console.info('[verbose]', ...arguments)
        }
    }

    if (!nsfData) { 
        throw new Error('NSF data is null or undefined')
    }
    if (!(nsfData instanceof Uint8Array)) {
        throw new Error('NSF Data must be passed using a uint8Array.')
    }
    if (!nsfData.length) {
        throw new Error('NSF Data array appears to be empty')
    }

    options = {
        assembler: 'ca65',
        ...(options ?? {})
    }
    const additionalArgs = []
    if (options.ntscOnly) {
        additionalArgs.push('-ntsc')
    }
    if (options.palOnly) {
        additionalArgs.push('-pal')
    }
    let outputFile
    if (['asm6', 'ca65'].indexOf(options.assembler) !== -1) {
        additionalArgs.push(`-${options.assembler}`)
        outputFile = 'file' + (options.assembler === 'asm6' ? '.asm' : '.s')
    } else {
        throw new Error(`Unknown assembler: ${options.assembler}. Options are ca65 and asm6.`)
    }
    
    const createModule = require('./emscripten/nsf2data')
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

    Module.FS.writeFile('file.nsf', nsfData)
    logVerbose('Sending arguments', JSON.stringify(['file.nsf', ...additionalArgs]))
    Module.callMain(['file.nsf', ...additionalArgs])

    // Parse stdout to send some meta information over
    const stdoutBreaks = stdout.split('\n').map(l => l.trim())

    const successLine = stdoutBreaks.find(ln => ln.startsWith('Total data size'))
    if (!successLine) {
        throw new Error('Conversion failed! Error output follows: \n' + stdout)
    }
    const size = parseInt(successLine.substring(16), 10)
    const effectsLine = stdoutBreaks.find(l => l.endsWith('effects found'))
    const effects = parseInt(effectsLine.substring(0, effectsLine.indexOf(' ')))

    logVerbose('Trying to read from', outputFile)
    const data = Module.FS.readFile(outputFile, { encoding: 'utf8' })

    return {
        data,
        size,
        effects
    }
}

if (typeof window !== 'undefined') { window.nsf2data = nsf2data }
if (typeof module !== 'undefined') { module.exports = nsf2data }