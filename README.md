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

TBD

## License 

This code is released under the MIT license. See details in the [license file](./LICENSE).