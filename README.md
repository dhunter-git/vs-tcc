# Tiny-C Compiler
Run and compile C programs with Tiny-C (tcc) from VSCode.<br/>
This extension is based on Hilmar Gústafsson's "TCC Compiler" (https://github.com/LiHRaM/vscode-tcc-compiler)<br/>
and Fabrice Bellard's Tiny C Compiler (https://bellard.org/tcc/)

## Install 
```sh
ext install vs-tcc
```
## Features
- Comes with integrated tcc on the Windows platform
- Run your code with the command `TCC: Run` or use the shortcut `"F10"`
- Build an executable with `TCC: Compile` or use the shortcut `"F11"` 
- Configure build args for projects with the workspace settings `TCC.flags` and `TCC.args`
- Currently, this extension supports Win32 and Linux (x86_64) configurations of vscode.<br/>
   The Tiny C Compiler is included for Windows plattforms.<br/>
   For Linux you have to install `tcc` from a package repository. e.g. Ubuntu: `sudo apt install tcc`



## Build

Requirements:

- node.js Version 14+
- npm
- tsc
- vsce

To build the package, just issue:

​	vsce package



## Release Notes

Version 1.0.4

Fixed problem with missing tcc.exe on windows.



Version 1.0.3

Pressing "F11" (compile) now also uses TCC.args for compilation.



## License

MIT ... this extension<br/>
GNU Lesser General Public License (LGPL) ... Tiny-C Compiler
