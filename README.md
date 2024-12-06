# switch-tab README

Gave up on this. VS Code doesn't appear to have exposed enough of their API to make this doable. See [NOTES.md](./NOTES.md).

This extension adds the command `switch-tab.quickOpenTab` which allows you to quickly switch between tabs.

The extension fills a niche gab that isn't quite solved by `workbench.action.quickOpenPreviousRecentlyUsedEditor` or `workbench.action.showAllEditors`. `workbench.action.quickOpenPreviousRecentlyUsedEditor` doesn't allow you to type to filter down the list. `workbench.action.showAllEditors` does, but it doesn't default the selection to the previous active editor, which means you can't use it to quickly switch between two editors.

## TODO

Features:

-   [ ] Fix it so that it focuses the exiting open file in the existing tab group
-   [ ] It should refresh the list when you close/pin tabs
-   [ ] Finish pin implementation
-   [ ] Extend it so that the default selection is the most recently viewed tab

Setup:

-   [x] Configure devcontainer and automations
-   [x] Configure prettier
-   [ ] Fix tests so they run in Gitpod Flex
-   [ ] Publish extension
-   [ ] Configure CI

## Development

```
npm i
./node_modules/.bin/vsce package
# Install using the Install from VSIX command
```

## Features

None

## Requirements

None

## Extension Settings

None

## Known Issues

None

## Release Notes

### 1.0.0

TODO
