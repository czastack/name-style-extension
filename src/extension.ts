import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.nameStyle', function () {
		// Get the active text editor
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;
			let selection = editor.selection;

			// Get the word within the selection
			let word = document.getText(selection);
			let ishump = word.match(/[A-Z]/);
			
			if (ishump) {
				word = word.replace(/(?<=[a-z])([A-Z])/g, m => '_' + m.toLowerCase()).toLowerCase();
			} else {
				word = word.replace(/(?:_|^)(\w)/g, m => m.substr(-1).toUpperCase());
			}
			editor.edit(editBuilder => {
				editBuilder.replace(selection, word);
			});
		}
	});

	context.subscriptions.push(disposable);
}