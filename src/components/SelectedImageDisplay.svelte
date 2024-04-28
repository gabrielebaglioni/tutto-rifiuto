<script lang="ts">
    import { activeItem,  type CatalogItem, type Item } from '../store';
    import {onDestroy} from "svelte";
    import VariableContentComponent from "./VariableContentComponent.svelte";

    let selectedItem: Item | null = null;
    let parentCatalog: CatalogItem | null = null;

    const unsubscribe = activeItem.subscribe(active => {
        selectedItem = active.item;
        parentCatalog = active.catalog;
        console.log(`Selected item: ${JSON.stringify(selectedItem)}`);
        console.log(`Parent catalog: ${JSON.stringify(parentCatalog)}`);
        console.log(`Active item: ${JSON.stringify(active)}`);
    });

    onDestroy(() => {
        unsubscribe();
    });

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
</script>

<style>
    .image-container {
        position: relative;
        height: auto;
        max-height: 400px;
        overflow: hidden;
    }
    .image {
        display: block;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        margin: auto;
    }
    .item-info {
        display: flex;
        flex-wrap: wrap;
        padding: 1rem;
        font-size: 0.9rem;
    }
    .item-info > div {
        padding: 0.5rem;
    }
    .left-info {
        width: 58.3333%;
    }
    .middle-info {
        width: 16.6667%;
    }
    .right-info {
        width: 25%;
        text-align: right;
    }
</style>

{#if selectedItem }
    <div class="mb-24 md:mb-4 w-full md:w-6/12 py-1 ">
        <div class="image-container ">
            {#if determineFileType(selectedItem.url) === 'video'}
                <video src={selectedItem.url} controls class="image"></video>
            {:else if determineFileType(selectedItem.url) === 'audio'}
                <audio src={selectedItem.url} controls class="image"></audio>
            {:else if determineFileType(selectedItem.url) === 'pdf'}
                <iframe src={selectedItem.url} class="image"></iframe>
            {:else if determineFileType(selectedItem.url) === 'image'}
                <img src={selectedItem.url} alt={selectedItem.alt || 'Content'} class="image">
            {:else}
                <p>Unsupported file type</p>
            {/if}
        </div>
        <div class="item-info">
            <div class="left-info">
                <p>{parentCatalog?.name}, {parentCatalog?.year}</p>
                <p>{parentCatalog?.category}</p>
            </div>
            <div class="middle-info">
                <p>{parentCatalog?.id}</p>
            </div>
            <div class="right-info">
                <p>1/{parentCatalog?.items.length}</p>
            </div>
            <div class="w-full max-w-md">
                <p>Full branding for {parentCatalog?.name}: a description here. <br>In collaboration with partners.</p>
            </div>
        </div>
    </div>
{:else}
   <VariableContentComponent />
{/if}
