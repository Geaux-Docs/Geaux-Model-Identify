# AI API Monitor

AI API Monitor is a Chrome extension that monitors network traffic for AI-related API requests. It helps developers track API calls to AI services like OpenAI, GPT, Anthropic, and HuggingFace.

## Features

- **Request Interception**: Captures network requests containing specified keywords.
- **Custom Keywords**: Allows users to define their own filter keywords.
- **Data Storage**: Stores intercepted requests locally for analysis.
- **User Interface**: Provides a popup to view captured API calls.

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the extension directory.

## Usage

- Click the extension icon to view intercepted API calls.
- Go to **Options** to add or modify filter keywords.

## Development Plan

- **Enhance UI**: Improve the popup interface for better readability.
- **Export Data**: Add functionality to export intercepted data as a file.
- **Filtering**: Implement advanced filtering options in the popup.
- **Notification System**: Notify users when specific API calls are detected.
- **Cross-Browser Support**: Adapt the extension for Firefox and other browsers.
