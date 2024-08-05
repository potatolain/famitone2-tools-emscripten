async function nsf2data(data, options) {
    // FIXME: support options, default to ca65 but allow asm6/the other one
    // Also support ntsc as a flag, default to doing both
    // FIXME: Try rest, build real test with an nsf
    // FIXME: Create a binary output mode for patching
    const createModule = require('./emscripten/nsf2data')
    const Module = await createModule({
        print: console.info,
        setStatus: console.info
    })
    Module.FS.writeFile('file.nsf', data)
    Module.callMain(['file.nsf', '-ca65', '-ntsc'])
    const output = Module.FS.readFile('file.s', { encoding: 'utf8' })

    return data;
}

if (typeof window !== 'undefined') { window.nsf2data = nsf2data }
if (typeof module !== 'undefined') { module.exports = nsf2data }