import { group } from "console";
import * as vscode from "vscode";

type Tab = vscode.QuickPickItem & { uri?: vscode.Uri };

// Sort of hacky - I just need to be able to show the last active editor
// as the first item in the list so that you can quickly jump back and forth between two files
let lastFocusedEditor: vscode.TextEditor | null = null;
let activeEditor: vscode.TextEditor | null = null;

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor((editor) => {
            if (editor) {
                lastFocusedEditor = activeEditor;
                activeEditor = editor;
            }
        }),
    );

    const disposable = vscode.commands.registerCommand("switch-tab.quickOpenTab", async () => {
        const tabs: Tab[] = [];

        if (lastFocusedEditor) {
            tabs.push({
                label: "recently opened",
                kind: vscode.QuickPickItemKind.Separator,
            });
            tabs.push({
                label: lastFocusedEditor.document.fileName,
                description: lastFocusedEditor.document.uri.path,
                uri: lastFocusedEditor.document.uri,
                iconPath: vscode.ThemeIcon.File,
            });
        }

        vscode.window.tabGroups.all.map((tabGroup, tabGroupIndex) => {
            tabs.push({
                label: `Group ${tabGroupIndex + 1}`,
                kind: vscode.QuickPickItemKind.Separator,
            });
            tabGroup.tabs.map((tab) => {
                if (tab.input instanceof vscode.TabInputText) {
                    tabs.push({
                        label: tab.label,
                        description: tab.input.uri.path,
                        uri: tab.input.uri,
                        kind: vscode.QuickPickItemKind.Default,
                        iconPath: vscode.ThemeIcon.File,
                    });
                }
            });
        });

        const tab = await vscode.window.showQuickPick(tabs, {
            title: "Select a tab",
            placeHolder: "Select a tab placeholder",
            canPickMany: false,
        });

        if (!tab || !tab.uri) {
            return;
        }

        vscode.window.showTextDocument(tab.uri);
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
