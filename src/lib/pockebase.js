import Pocketbase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new Pocketbase('https://imanjlai.online:443');
export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    console.log("authStore changed", auth);
    currentUser.set(pb.authStore.model)
});