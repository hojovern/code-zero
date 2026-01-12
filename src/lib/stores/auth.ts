import { writable } from 'svelte/store';

export const showLoginModal = writable(false);
export const showApplyModal = writable(false);
export const showTasterModal = writable(false);

export function openLoginModal() {
	showLoginModal.set(true);
}

export function closeLoginModal() {
	showLoginModal.set(false);
}

export function openApplyModal() {
	showApplyModal.set(true);
}

export function closeApplyModal() {
	showApplyModal.set(false);
}

export function openTasterModal() {
	showTasterModal.set(true);
}

export function closeTasterModal() {
	showTasterModal.set(false);
}