# Sketch 71 Symbol Resync

This plugin restores the correct ID for Cloud Libraries opened in Sketch 71.0. You'll know you're experiencing this issue if the Symbols and Shared Styles in your document have stopped showing their source Library in the Inspector and show "This Document" instead.

## Usage

1. Download and install the plugin (see the 'Installation' section for more details)
2. Open the faulty document directly from Cloud, select a Symbol Instance, and choose 'Plugins › Sketch 71 Symbol Resync › Step 1'
3. Now locate the source Library on Cloud, and download it to your computer using the ... menu that appears when you hover over the document preview on Cloud (choose 'Download Document')
4. Open the local copy of your Library you just downloaded, and choose 'Plugins › Sketch 71 Symbol Resync › Step 2'
5. Save the document, and push the changes back to Cloud by clicking the 'Collaborate' icon in Sketch's toolbar, and then 'Update Document…'
6. Delete the local Library document, open Sketch › Preferences › Libraries and redownload the Library you updated
7. Finally, open the faulty document and make sure all the Components are now showing the right source in the Inspector

## Installation

- [Download](../../releases/latest/download/sketch-71-symbol-resync.sketchplugin.zip) the latest release of the plugin
- Un-zip
- Double-click on sketch-71-symbol-resync.sketchplugin