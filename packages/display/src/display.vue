<template>
	<value-null v-if="!value" />
	<div v-else class="display-action-display">
		<v-hover v-slot="{ hover }" class="hover-test">

			<component
				:is="(clickAction === 'link') ? 'a' : 'span'" 
				class="dynamic-wrapper"
				:href="computedLink"
			>
				<span 
					:class="hasValueClickAction ? 'action-background' : ''"
					@click="valueClickAction"
				>
					{{ value }}
				</span>
			</component>
			

			<v-icon 
				v-if="showCopy && isCopySupported"
				name="content_copy"
				right
				@click.stop="copyValue"
				v-tooltip="`Copy to clipboard: ${value}`"
			/>
			

			<a 
				v-if="showLink"
				:href="computedLink"
				target="_blank"
				rel="noopener noreferrer"
				@click.stop
			>
				<v-icon 
					name="open_in_new"
					right
				/>
			</a>

		</v-hover>
	</div>
</template>




<script setup lang="ts">
import {computed } from 'vue';
import { useClipboard } from '../../../shared/composable/use-clipboard';
import { useLink } from '../../../shared/composable/use-link';
import { useStores } from '@directus/extensions-sdk';

const props = defineProps({
	value: {
		type: String,
		default: null,
	},
	type: {
		type: String,
		required: true,
	},
	interfaceOptions: {
		type: Object,
		default: {},	// TODO: type to options!
	},
	contentType: {
		type: String,
		default: 'other',
	},
	clickAction: {
		type: String,
		default: 'default',
	},
	showCopy: {
		type: Boolean,
		default: false,
	},
	showLink: {
		type: Boolean,
		default: false,
	},
});


const { isCopySupported, copyToClipboard } = useClipboard();


const { useNotificationsStore } = useStores();
const notificationStore = useNotificationsStore();	


async function copyValue() {
	await copyToClipboard(props.value, notificationStore);
};


function valueClickAction(e: Event) {
	if (props.clickAction === 'copy') {
		e.stopPropagation();
		copyValue();
	} 
	// else go on with the default events
}


const hasValueClickAction = computed(() => {
	if (props.clickAction === 'default') return false;
	if (props.clickAction === 'copy' && isCopySupported) return true;
	if (props.clickAction === 'link') return true;

	return false;
});


const { computedLink } = useLink(props);

</script>




<style lang="scss" scoped>
	.display-action-display {
		:deep(.v-icon) {
			--v-icon-size: 18px;
			--v-icon-color: var(--border-normal-alt);

			&:hover {
				--v-icon-color: var(--primary);
			}
		}

		.action-background {
			background-color: var(--primary-10);
			padding: 0.5rem 1rem;
    	border-radius: 5rem; // aritary value for a nice smooth rounding

			&:hover {
				background-color: var(--primary-25);
			}
		}
	}
	
</style>