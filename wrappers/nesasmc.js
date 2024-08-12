async function nesasmc(textData, options = {}) {
    
    function logVerbose() {
        if (options.verbose) {
            console.info('[verbose]', ...arguments)
        }
    }

    if (!textData) { 
        throw new Error('Assembly program data is null or undefined')
    }
    if (typeof textData !== 'string') {
        throw new Error('Program must be passed as a text string')
    }
    
    const createModule = require('./emscripten/nesasmc')
    let stdout = ''
    const Module = await createModule({
        print: str => { 
            stdout += str + '\n'
            logVerbose('[stdout]', str) 
        },
        setStatus: status => logVerbose('Status updated to', status),
        ...(options.moduleSettings ?? {})
    })

    // This is a bit duct-tape-y but I can't be bothered to do it right. Clear stdout
    // before we run a second time. (This could be avoided by changing how we export things in emscripten)
    stdout = ''

    Module.FS.writeFile('file.asm', textData)
    logVerbose('Sending arguments', JSON.stringify(['file.asm']))
    Module.callMain(['file.asm'])

    if (stdout.trim().length === 0) {
        // Success
        const ca65 = Module.FS.readFile('file.s', { encoding: 'utf8' }),
            asm6 = Module.FS.readFile('file_asm6.asm', {encoding: 'utf8'})
        return {
            ca65, asm6
        }
    } else {
        throw new Error('Unable to convert. Error follows\n' + stdout)
    }
}

if (typeof window !== 'undefined') { window.nesasmc = nesasmc }
if (typeof module !== 'undefined') { module.exports = nesasmc }