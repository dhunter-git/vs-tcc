"use strict";
import * as vscode from 'vscode';
import * as path from "path";
const os = require('os');

let _terminalStack: vscode.Terminal[] = [];
let _context: vscode.ExtensionContext;


function call_tcc(run_arg: string): void {
  if (vscode.window.activeTextEditor === undefined) {
    vscode.window.showInformationMessage('Tiny-C Compiler tcc Extension : Load file first');
  }
  else if (vscode.window.activeTextEditor.document.isUntitled) {
    vscode.window.showInformationMessage('Tiny-C Compiler tcc Extension : Save file first');
  }
  else if (vscode.window.activeTextEditor.document.languageId === "c") {
    let _activeTextEditor: vscode.TextDocument = vscode.window.activeTextEditor.document;
    if (_activeTextEditor.isDirty) { _activeTextEditor.save(); };
    checkTerminal();
    getLatestTerminal().sendText(tcc(getFlags() + run_arg + getArgs()));
    if ((vscode.window.activeTerminal === undefined) || (vscode.window.activeTerminal !== _terminalStack[0])) {
      getLatestTerminal().show();
    }
  }
  else {
    vscode.window.showInformationMessage('Tiny-C Compiler tcc Extension : must Edit C file');
  }
}

/**
 * Runs according to current flags.
 * Defaults to currently open C file if no flags are given.
 */
export function run(): void {
  call_tcc(" -run ");
}

/**
 * Runs TCC according to given flags.
 * Defaults to currently open C file if no tcc.json file is found.
 */
export function compile(): void {
  call_tcc(" ");
}

/**
 * Sets the context.
 */
export function setContext(context: vscode.ExtensionContext) {
  _context = context;
}

/**
 * Gets the flags from settings
 */
function getFlags(): string {
  let space = " ";
  try {
    var conf = vscode.workspace.getConfiguration("TCC").get("flags");
    if (conf !== null && conf !== undefined) {
      return space + conf;
    }
    throw new Error("No flags given. Reverting to default.");
  } catch (error) {
    console.log(error);
    return space + getFileName();
  }
}

/**
 * Gets the args from settings
 */
function getArgs(): string {
  let space = " ";
  try {
    var conf = vscode.workspace.getConfiguration("TCC").get("args");
    if (conf !== null && conf !== undefined) {
      return space + conf;
    }
    throw new Error("No args given. Reverting to default.");
  } catch (error) {
    console.log(error);
    return "";
  }
}

/**
 * Creates a new terminal if none exist.
 */
function newTerminal() {
  let terminal = vscode.window.createTerminal(
    `TCC Terminal`
  );
  _terminalStack.push(terminal);
}

function checkTerminal() {
  if (0 === _terminalStack.length) {
    newTerminal();
  }
  else if (!vscode.window.terminals.includes(_terminalStack[0])) {
    _terminalStack.pop();
    newTerminal();
  }
}
/**
 * Gets the current terminal.
 */
function getLatestTerminal(): vscode.Terminal {
  return _terminalStack[_terminalStack.length - 1];
}

/**
 * Gets the name of the current C file.
 */
function getFileName(): string {
  if (vscode.window.activeTextEditor == undefined)
    return '""';
  else
    return '"' + vscode.window.activeTextEditor.document.fileName.toString() + '"';
}

/**
 * Gets the path of TCC.
 * @param args Arguments for Tiny C Compiler.
 */
function tcc(flags: string): string {
  let space = " ";
  let tccPath = "";
  switch (os.platform()) {
    case 'linux':
      tccPath = "usr/bin/tcc";
      return path
        .join("/", tccPath)
        .concat(space + flags);
    case 'win32':
      tccPath = "/tcc-win32/tcc.exe";
      return path
        .join(_context.extensionPath, tccPath)
        .concat(space + flags);
    default:
      console.log("Error: platform " + os.platform() + " not supported.");
  }

  return path
    .join(_context.extensionPath, tccPath)
    .concat(space + flags);
}
