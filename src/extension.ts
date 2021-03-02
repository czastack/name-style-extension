import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.nameStyle', nameStyle));
    context.subscriptions.push(vscode.commands.registerCommand('extension.nameStyleBig', nameStyle.bind(null, true)));
}


function nameStyle(big: Boolean) {
    // Get the active text editor
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const document = editor.document;
        const selection = editor.selection;

        // Get the word within the selection
        let word = document.getText(selection);
        const isCamel = word.match(/[A-Z]/);
        
        if (isCamel) {
            word = word.replace(/(?<=[a-z])([A-Z])/g, (m: string) => '_' + m.toLowerCase()).toLowerCase();
        } else {
            word = word.replace(big ? /(?:_|^)(\w)/g : /(?:_)(\w)/g, (m: string) => m.substr(-1).toUpperCase());
        }
        editor.edit(editBuilder => {
            editBuilder.replace(selection, word);
        });
    }
}