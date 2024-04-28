<script lang="ts">
    import type {Item} from "../store";

    export let item: Item;
    let fileType = '';

    // Funzione per determinare il tipo di file dall'URL
    const determineFileType = (url: string) => {
        let extension = url.split('.').pop();
        extension = extension ? extension.toLowerCase() : '';
        if (['mp4', 'webm'].includes(extension)) {
            return 'video';
        } else if (['mp3', 'wav', 'ogg'].includes(extension)) {
            return 'audio';
        } else if (['pdf'].includes(extension)) {
            return 'pdf';
        } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
            return 'image';
        }
        return 'unknown';
    };

    // Aggiorna il tipo di file quando l'URL cambia
    $: fileType = determineFileType(item.url);
</script>
<style>
    .catalog-image {
        height: auto;
        width: auto;
        max-height: 70px;
        max-width: 100%;
        object-fit: cover;
    }

</style>

<!-- Visualizza il contenuto basato sul tipo di file -->
{#if fileType === 'video'}
    <video src={item.url} controls class="catalog-image" ></video>
{:else if fileType === 'audio'}
    <audio src={item.url} controls class="catalog-image"></audio>
{:else if fileType === 'pdf'}
    <iframe src={item.url} class="catalog-image" ></iframe>
{:else if fileType === 'image'}
    <img src={item.url} alt="Content" class="catalog-image" >
{:else}
    <p>Unsupported file type</p>
{/if}