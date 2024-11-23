import * as vscode from "vscode";

type QuickPickItemTab = vscode.QuickPickItem & { tab?: vscode.Tab };

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand("switch-tab.quickOpenTab", async () => {
        const tabs: QuickPickItemTab[] = [];

        vscode.window.tabGroups.all.map((tabGroup, tabGroupIndex) => {
            tabs.push({
                label: `Group ${tabGroupIndex + 1}`,
                kind: vscode.QuickPickItemKind.Separator,
            });
            tabGroup.tabs.map((tab) => {
                if (tab.input instanceof vscode.TabInputText) {
                    let icon = "";
                    if (tab.isPinned && tab.isDirty) {
                        icon = " $(pinned-dirty)";
                    } else if (tab.isPinned) {
                        icon = " $(pinned)";
                    } else if (tab.isDirty) {
                        icon = " $(close-dirty)";
                    }
                    // TODO: Would be lovely to have it use the file icons. Eventually it should happen automatically
                    // when iconPath is set to file and an resourceUri is passed, but for now that's not implemented: https://github.com/microsoft/vscode/issues/59826
                    tabs.push({
                        label: `${tab.label}${icon}`,
                        description: tab.input.uri.path,
                        buttons: [
                            { iconPath: new vscode.ThemeIcon("close"), tooltip: "Close" },
                            { iconPath: new vscode.ThemeIcon("pin"), tooltip: "Pin" },
                        ],
                        kind: vscode.QuickPickItemKind.Default,
                        iconPath: vscode.ThemeIcon.File,
                        tab: tab,
                    });
                }
            });
        });

        const pick = vscode.window.createQuickPick<QuickPickItemTab>();
        pick.title = "Switch Tab";
        pick.placeholder = "Select a tab";
        pick.items = tabs;
        pick.canSelectMany = false;

        pick.onDidChangeSelection((selections) => {
            pick.hide();
            const selection = selections[0];
            const tab = selection?.tab;
            if (tab && tab.input instanceof vscode.TabInputText) {
                vscode.window.showTextDocument(tab.input.uri);
            }
        });

        pick.onDidHide(() => pick.dispose());

        pick.onDidTriggerItemButton((e) => {
            if (e.button.tooltip === "Close" && e.item.tab) {
                vscode.window.tabGroups.close(e.item.tab);
            }
        });

        pick.show();
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
