"use strict";

import { run, compile, setContext } from "./commands";
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log("TCC-Compiler is active.");

  // Send the context to the functions folder to keep this one lean.
  setContext(context);

  // TCC: Run
  context.subscriptions.push(
    vscode.commands.registerCommand("tcc.run", () => {
      run();
    })
  );

  // TCC: Compile
  context.subscriptions.push(
    vscode.commands.registerCommand("tcc.compile", () => {
      compile();
    })
  );
}
