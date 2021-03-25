import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

export function getLibraryID() {
  let selection = sketch.getSelectedDocument().selectedLayers
  if(selection.length != 1) {
    sketch.UI.alert('Select a Component', 'Go to your document and select a Component that has lost its link to its Source Library.')
  } else {
    let selectedLayer = selection.layers[0]
    let success = false
    // This should work with Symbol Instances, but also with anything that we can
    // import from a Library, like Shared Layer Styles, Text Styles, or Color Variables
    // Color Variables are not supported by now
    switch (selectedLayer.type) {
      // If `getLibrary()` is `null`, that only means that the Component is local
      case 'SymbolInstance':
        if (selectedLayer.master.getLibrary() != null) {
          NSPasteboard.generalPasteboard().clearContents()
          NSPasteboard.generalPasteboard().writeObjects([selectedLayer.master.getLibrary().id])
          success = true
        }
        break
      default:
        if (selectedLayer.sharedStyle != null) {
          if (selectedLayer.sharedStyle.getLibrary() != null) {
            NSPasteboard.generalPasteboard().clearContents()
            NSPasteboard.generalPasteboard().writeObjects([selectedLayer.sharedStyle.getLibrary().id])
            success = true
          }
        }
        break
    }
    if (success) {
      sketch.UI.alert('Library ID copied to clipboard', `We’ve found the correct ID for your Source Library.\nNow run Step 2.`)
    } else {
      sketch.UI.alert('No Library ID found', `We couldn’t find a correct ID in this document. Make sure you selected a Component or Layer with a shared Style, then run the plugin again.`)
    }
  }
}
export function injectLibraryID(){
  let correctID = NSPasteboard.generalPasteboard().stringForType(NSPasteboardTypeString)
  // Sanity check to make sure we're not getting something that's not an ID from the pasteboard
  if (correctID.match(/([\w]{8}\-[\w]{4}\-[\w]{4}\-[\w]{4}\-[\w]{12})/)) {
    let doc = sketch.getSelectedDocument()
    if (doc.id != correctID) {
      doc._object.documentData().setObjectID(correctID)
      sketch.UI.alert('Replacing Library ID…', `Now save your Library to update your Workspace.\n\nAll done!`)
    } else {
      sketch.UI.alert('Correct ID already in Library', `It looks like this Library already has the correct ID.\n\nYou don’t need to do anything else.`)
    }
  } else {
    sketch.UI.alert('Copy your Library ID', `First, make sure that you have correct Source Library ID in your clipboard.\n\nRun Step 1 in a document with a broken component.`)
  }
}
