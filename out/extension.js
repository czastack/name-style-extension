"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.nameStyle', nameStyle));
    context.subscriptions.push(vscode.commands.registerCommand('extension.nameStyleBig', nameStyle.bind(null, true)));
}
exports.activate = activate;
function nameStyle(big) {
    // Get the active text editor
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const document = editor.document;
        const tasks = [];
        for (const selection of editor.selections) {
            // Get the word within the selection
            let word = document.getText(selection);
            let newWord;
            const ishump = word.match(/[A-Z]/);
            
            if (ishump) {
                newWord = word.replace(/(?<=[a-z])([A-Z])/g, m => '_' + m.toLowerCase()).toLowerCase();
            } else {
                newWord = word.replace(big ? /(?:_|^)(\w)/g : /(?:_)(\w)/g, m => m.substr(-1).toUpperCase());
            }
            if (word != newWord) {
                tasks.push({selection, word: newWord});
            }
        };
        console.log(tasks);
        if (tasks.length > 0) {
            editor.edit(editBuilder => {
                for (const {selection, word} of tasks) {
                    editBuilder.replace(selection, word);
                }
            });
        }
    }
}
//# sourceMappingURL=extension.js.map