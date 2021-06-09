FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
)

FilePond.setOptions({
    stylePanelAspectRatio: 41 / 50,
    imageResizeTargetWidth: 50,
    imageResizeTargetHeight: 42
})

FilePond.parse(document.body);


// stylePanelAspectRatio: 150 / 100,
// imageResizeTargetWidth: 100,
//     imageResizeTargetHeight: 150