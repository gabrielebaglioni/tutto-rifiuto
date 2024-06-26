import { writable, get } from 'svelte/store';

export interface Item {
    id: string;
    url: string;
    alt?: string;
}

export interface CatalogItem {
    id: string;
    name: string;
    category: string;
    year: string;
    items: Item[];
}
export interface ActiveItem {
    item: Item | null;
    catalog: CatalogItem | null;
}
export const catalogItems = writable<CatalogItem[]>([{
    id: 'nk-0014',
    name: 'Arcadia',
    category: 'Tech/Gaming',
    year: '2023-2024',
    items: [
        { id: 'item1', url: 'https://media.gqitalia.it/photos/5d60131f1c0b03000814bc43/1:1/w_1657,h_1657,c_limit/GettyImages-845711818.jpg' },
        { id: 'item2', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/872px-Banana-Single.jpg' },
    ]
}, {
    id: 'nk-0015',
    name: 'Arcadia',
    category: 'Tech/Gaming',
    year: '2023-2024',
    items: [
        { id: 'item3', url: 'https://blog.giallozafferano.it/peperonciniedintorni/wp-content/uploads/2015/12/cachi-o-kaki-Diospyros-kaki_Frutti.jpg' },
        { id: 'item4', url: 'https://www.ortodacoltivare.it/wp-content/uploads/2018/03/cachi.jpg' },
    ]
}]);

export const allExpanded = writable(false);
export const expandedItems = writable<{ [key: string]: boolean }>({});
export const activeItem = writable<ActiveItem>({ item: null, catalog: null });

export function toggleItem(id: string) {
    expandedItems.update(items => {
        items[id] = !items[id];
        console.log(`Toggled item ${id}, new state: ${items[id]}`);
        if (items[id]) {
            const catalog = get(catalogItems).find(catalog => catalog.id === id);
            if (catalog && catalog.items.length > 0) {
                activeItem.set({ item: catalog.items[0], catalog });
                console.log(`Set activeItem to ${JSON.stringify(catalog.items[0])}`);
            }
        } else {
            activeItem.set({ item: null, catalog: null });
            console.log(`Set activeItem to null`);
        }
        return items;
    });
}
