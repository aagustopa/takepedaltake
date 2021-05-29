// logic for demo

FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
)

FilePond.setOptions({
    stylePanelAspectRatio: 150 / 100,
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 150
})

FilePond.parse(document.body);

// el input para pillar el file
/*
<div>
<label>Cover</label>
<input type="file" name="cover" class="filepond">
</div>
*/

/*
<link href="https://unpkg.com/filepond/dist/filepond.css" rel="stylesheet"/>
<link href="https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css" rel="stylesheet"></link>

<script defer src="https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.js"></script>

<script defer src="https://unpkg.com/filepond-plugin-file-encode/dist/filepond-plugin-file-encode.js"></script>

<script defer src="https://unpkg.com/filepond-plugin-image-resize/dist/filepond-plugin-image-resize.js"></script>

<script defer src="https://unpkg.com/filepond/dist/filepond.js"></script>

e importar este fichero fileupload*/