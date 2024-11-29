1. First, let's add debug configurations for both Chrome and Firefox in `launch.json`:

```json
{
  "launch": {
    "configurations": [
      {
        "name": "Firefox: Debug Extension",
        "type": "firefox",
        "request": "launch",
        "reAttach": true,
        "addonPath": "${workspaceFolder}",
        "firefoxExecutable": "/usr/bin/firefox"
      },
      {
        "name": "Chrome: Debug Extension",
        "type": "chrome",
        "request": "launch",
        "runtimeExecutable": "google-chrome",
        "runtimeArgs": [
          "--load-extension=${workspaceFolder}"
        ],
        "sourceMaps": true,
        "webRoot": "${workspaceFolder}",
        "preLaunchTask": "npm: build"
      }
    ],
    "compounds": [
      {
        "name": "Debug in Both Browsers",
        "configurations": [
          "Chrome: Debug Extension",
          "Firefox: Debug Extension"
        ]
      }
    ]
  }
}
```


Show in Settings Editor

. Create a `DEVELOPMENT.md` file with project structure and guidance:

. Open the new file and document the project structure:



Show in Command Palette



<!--
This document outlines the development workflow and structure for the Chrome extension project.

### Project Structure
- `src/`: Contains the source code for the extension.
  - `background/`: Main extension background script.
  - `popup/`: Extension popup UI, styles, and functionality.
  - `options/`: Settings page UI and functionality.
  - `utils/`: Utility scripts, including Chrome storage utilities and request filtering logic.
  - `icons/`: Extension icons.
- `dist/`: Build output directory.
- `node_modules/`: Project dependencies.
- `.vscode/`: Visual Studio Code debug configurations.
- `manifest.json`: Extension manifest file.
- `webpack.config.js`: Build configuration file.
- `package.json`: Project configuration file.
- `README.md`: Project documentation.

### Core Files
- `background.js`: Handles network request interception and processing.
- `storage.js`: Manages data persistence in Chrome storage.
- `filters/index.js`: Contains request filtering logic.

### UI Components
- `popup.js`: Main extension interface.
- `options.js`: Settings page logic.
- `manifest.json`: Extension configuration.
-->

npm run dev

```. Load extension in Chrome:
- Open chrome://extensions
- Enable Developer mode
- Click "Load unpacked"
- Select the `dist` directory

4. Debugging:
- Use VS Code's debug configurations
- Chrome DevTools for UI debugging
- Background page debugging via chrome://extensions

## Build Commands
- `npm run dev`: Development build with source maps
- `npm run build`: Production build
- `npm run watch`: Watch mode for development
- `npm run clean`: Clean build directory
- `npm test`: Run tests

## Best Practices
- Use ES6+ features
- Follow the existing code style
- Add JSDoc comments for functions
- Write unit tests for new features
```


5. Add this to the Quick Start section in your README.md:



Show in Command Palette