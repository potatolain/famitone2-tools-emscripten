# Famitone2 tools via emscripten

This is a quick hack of shiru's neslib tools to work within emscripten. This will allow them to be loaded
in javascript/web applications, and used as appropriate. 

The original tools were released into the Public Domain, so they are used with permission. I am releasing
this under MIT, though if for some reason that's restrictive for you, you are welcome to contact me to use
another license. 

## How's it work?

Basically, the original files are patched slightly to run on linux (mostly removing an unused import and swapping
out a method), then compiled with emscripten and made available as a library.

emscripten does come with a bit of overhead - the tools each cost about 200kb - which is pretty big when considering
web tooling. The library makes an effort to only load the large files when necessary, so the browser won't be bogged
down until the user needs this.

## Library Methods

### nsf2data (sound effect conversion)

Usage: `nsf2data(nsfData, options)`

**nsfData**: A uint8Array of data that a nsf file contains. If you're using node, you can get it like this:
```javascript
const nsfData = Uint8Array.from(fs.readFileSync('/path/to/sfx.nsf'))
```

**Options**: An object with parameters to configure the nsf generation

| option         | Potential Values | Description                                    |
|----------------|------------------|------------------------------------------------|
| assembler      | `asm6` or `ca65` | Which assembler to build for (Default: `ca65`) |
| ntscOnly       | `true` or `false`| Whether to generate only ntsc (Default: false) |
| palOnly        | `true` or `false`| Whether to generate only pal (Default: false)  |
| moduleSettings | Any `object`     | Settings to pass through to emscripten's module|

**Returns**: An object in the following format:
```javascript
{
    data: "; Assembly file output...", // This is the full text file output, in string form
    size: 500, // How many bytes the exported data takes up
    effects: 5 // How many sound effects were converted
}
```

**Example**:
```javascript
const testNsf = Uint8Array.from(fs.readFileSync('/path/to/file.nsf'))
const result = await nsf2data(testNsf, {assembler: 'ca65', ntscOnly: true})
console.log(result)
```

### text2data (music conversion)

Usage: `text2data(textData, options)`

**textData**: A string of music data usually found in music.txt. If you're using node, you can get it like this:
```javascript
const textData = fs.readFileSync('/path/to/music.txt').toString()
```

**Options**: An object with parameters to configure the nsf generation

| option          | Potential Values  | Description                                                      |
|-----------------|-------------------|------------------------------------------------------------------|
| assembler       | `asm6` or `ca65`  | Which assembler to build for (Default: `ca65`)                   |
| separateFiles   | `true` or `false` | Whether to break each song into a separate file (Default: false) |
| channels        | Number `1`-`5`    | The number of channels to include (Default: 5)                   |
| musicName       | Any string        | The name to use for the exported data. Will be postfixed with `_data` (Default: `music`) |
| moduleSettings  | Any `object`      | Settings to pass through to emscripten's module |


**Returns**: An object in the following format:
```javascript
 {
    data: "; Assembly file output...", // This is the full text file output, in string form
    dataSize: 2000, // How many bytes the exported data takes up
    dpcmSize: 50, // How many bytes dcpm takes up 
    songs: 5 // How many songs were converted
}
```

If `separateFiles` is set to true, `data` will take a different format: 

```javascript
{
    data: [
        "; Assembly file output 1...", // This is the full text file output, in string form
        "; Assembly file output 2...",
    ],
    size: 2000, // How many bytes the exported data takes up
    songs: 5 // How many songs were converted
}
```

### nesasmc (Convert nesasm to ca65 and asm6)

This is a little helper that came with the tool, which I believe was used on famitone2 itself.
This is included in case you find it useful. 

It has no specific options, just pass it an assembly file. Less checking is done on this than on
// others. It also has no output, so we don't provide much. But, if you need it, it's here.

Usage: `nesasmc(textData)`

**textData**: A valid nesasm program, in a string.

**Options**: An object with parameters to configure asm conversion
| option          | Potential Values  | Description                                     |
|-----------------|-------------------|-------------------------------------------------|
| moduleSettings  | Any `object`      | Settings to pass through to emscripten's module |


**Returns**: An object in the following format:
```javascript
{
    ca65: "; ca65 code" // Source code in ca65 format
    asm6: "; asm6 code" // Source code in asm6 format
}
```

## License 

This code is released under the MIT license. See details in the [license file](./LICENSE).