<script lang="ts">
    import { expandedItems, activeItem, toggleItem, type CatalogItem } from '../store';
    import ItemPreview from "./ItemPreview.svelte";
    export let item: CatalogItem;

    $: isExpanded = $expandedItems[item.id];

    function handleItemClick(itemId: string) {
        const catalog = item;
        const selectedItem = catalog.items.find(_item => _item.id === itemId);
        if (selectedItem) {
            activeItem.set({ item: selectedItem, catalog });
        }
    }

    function handleToggle() {
        toggleItem(item.id);
    }
</script>

<style>
    .button-link {
        display: inline-block;
        margin-right: 1rem;
        cursor: pointer;
    }
</style>
<div class="border-b border-solid border-low-opacity">
    <button class="hover:opacity-80 flex flex-wrap w-full text text-left py-1 mb-0 items-center" on:click={() => toggleItem(item.id)}>
        <div class="w-3/12">{item.id}</div>
        <div class="w-6/12 md:w-3/12">{item.name}</div>
        <div class="hidden md:block w-3/12">{item.category}</div>
        <div class="w-3/12 text-right">{item.year}</div>
    </button>
    {#if isExpanded}
        <div class="flex button-links w-full mt-2 mb-2">
            {#each item.items as _item (_item.id)}
                <button class="button-link" on:click={() => handleItemClick(_item.id)}>
                    <ItemPreview item={_item} />
                </button>
            {/each}
        </div>
    {/if}
</div>