## Focusing editors

The only public API I can find is `vscode.window.showTextDocument` but that that will now focus an editor in a different tab group.

## Pinning tabs

Tried to implement an action to pin tabs, but it appears that VS Code doesn't quite expose the required APIs to do so. There's a method on `EditorGroupView` but it's unclear to me how I'd get an instance of that from the public API.

I tried to invoke `vscode.commands.executeCommand("workbench.action.pinEditor");` but that only pins the currently open editor.
