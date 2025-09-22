/**
 * Composable to access the clipboard api
 * and check if the api is available
 * 
 * Based on the apps own composable
 * @see https://github.com/directus/directus/blob/main/app/src/composables/use-clipboard.ts
 * 
 * @NOTE in contrast to the onirinal app's solution we need to pass the notification sotre instance.
 * 			That's to make sure that the instance exists and is available
 */


import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStores } from '@directus/extensions-sdk';

type Message = {
	success?: string;
	fail?: string;
};



export function useClipboard() {
	const { t } = useI18n();
	const { useNotificationsStore } = useStores();
	const notificationStore = useNotificationsStore();	

	const isCopySupported = computed(() => {
		return !!navigator?.clipboard?.writeText;
	});

	const isPasteSupported = computed(() => {
		return !!navigator?.clipboard?.readText;
	});

	return { isCopySupported, isPasteSupported, copyToClipboard, pasteFromClipboard };

	async function copyToClipboard(value: string, message?: Message): Promise<boolean> {
		try {
			await navigator?.clipboard?.writeText(value);
			notificationStore.add({
				title: message?.success ?? t('copy_raw_value_success'),
			});
			return true;
		} catch (err: any) {
			notificationStore.add({
				type: 'error',
				title: message?.fail ?? t('copy_raw_value_fail'),
			});
			return false;
		}
	}

	async function pasteFromClipboard(notificationStore: any, message?: Message): Promise<string | null> {
		try {
			const pasteValue = await navigator?.clipboard?.readText();
			notificationStore.add({
				title: message?.success ?? t('paste_raw_value_success'),
			});
			return pasteValue;
		} catch (err: any) {
			notificationStore.add({
				type: 'error',
				title: message?.fail ?? t('paste_raw_value_fail'),
			});
			return null;
		}
	}
}
