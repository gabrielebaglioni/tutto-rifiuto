<script>
    import '../styles/global.css';
    import CatalogItem from '../components/CatalogItem.svelte';
    import SelectedImageDisplay from '../components/SelectedImageDisplay.svelte';
    import {allExpanded, catalogItems, expandedItems} from "../store";
    import LogoComponent from "./LogoComponent.svelte";

    // Function to toggle all expansions
    function toggleAllExpand() {
        allExpanded.update(n => !n);
        expandedItems.update(items => {
            const newState = !Object.values(items).every(Boolean);
            for (let key in items) {
                items[key] = newState;
            }
            return items;
        });
    }
</script>

<div id="__next" class="flex flex-wrap">
    <div class="mb-24 md:mb-4 w-full md:w-6/12 px-6 py-6">
        <LogoComponent logoUrl="../../favicon.png" altText="Newkid Logo" />
        <SelectedImageDisplay />
    </div>
    <div class="w-full md:w-6/12">
        <section class="flex flex-wrap relative md:fixed w-full md:w-2/4 pl-6 md:pl-0 pr-6 py-6 z-10 justify-between pb-2">
            <div><p class="uppercase mb-0">Catalog</p></div>
            <button on:click={toggleAllExpand}>Expand All [+]</button>
        </section>
        <section class="flex flex-wrap flex-col pt-0 md:pt-14 md:top-0 md:right-0 pl-6 md:pl-0 pr-6 pb-8">
            <div class="w-full block"></div>
            <div class="w-full self-start overflow-hidden">
                {#each $catalogItems as item}
                    <CatalogItem {item} />
                {/each}
            </div>
        </section>
    </div>
</div>