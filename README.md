# TCC Compiler
[![Build Status](https://travis-ci.org/LiHRaM/vscode-tcc-compiler.svg?branch=master)](https://travis-ci.org/LiHRaM/vscode-tcc-compiler)

Quickly compile and run your C applications with the [Tiny C Compiler](https://bellard.org/tcc/) integrated with VSCode!

## Install 
```sh
ext install vs-tcc
``` 
## Features
- Completely independent.
- Instantly run the program by using palette command `TCC: Run`
- Compile to executable file with palette command `TCC: Compile`
- Configure build args for projects with the workspace settings `TCC.flags` and `TCC.args`
- Currently, this extension supports Win32 and Linux (x86_64) configurations of vscode. The Tiny C Compiler is included for both platforms.

## License
MIT - Extension
GNU Lesser General Public License (LGPL) - Tiny C Compiler
