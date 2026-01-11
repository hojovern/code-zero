import { writable } from 'svelte/store';

export const showLoginModal = writable(false);

export function openLoginModal() {
	showLoginModal.set(true);
}

export function closeLoginModal() {
	showLoginModal.set(false);
}
