<!-- @see https://github.com/directus/directus/blob/main/app/src/interfaces/input/input.vue -->

<template>
	<div class="action-interface">
		<v-input 
			:model-value="value" 
			:disabled="disabled"
			:type="inputType"
			@update:model-value="$emit('input', $event)"
		>
			<template v-if="iconLeft" #prepend><v-icon :name="iconLeft" /></template>
		</v-input>

		<!-- TODO: add tooltips -->
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
				v-tooltip="`Follow link: ${computedLink}`"
			/>
		</a>
	</div>
	
	<!-- TODO: create interface -->
	<!-- TODO: share button stuff with display -->
	<!-- TODO: add input for different types, add readonly support -->
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard } from '../../../shared/composable/use-clipboard';
import { useLink } from '../../../shared/composable/use-link';
import { useStores } from '@directus/extensions-sdk';

const props = defineProps({
	value: {
		type: [String, Number],
		default: null,
	},
	contentType: { // TODO: use content type for action
		type: String,
		default: 'other',
	},
	clickAction: {	// TODO add action
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
	placeholder: {
		type: String,
		default: null,
	},
	iconLeft: {
		type: String,
		default: null,
	},
	iconRight: {
		type: String,
		default: null,
	},
	min: {
		type: Number,
		default: undefined,
	},
	max: {
		type: Number,
		default: undefined,
	},
	step: {
		type: Number,
		default: 1,
	},
	// global optiopns (independend from this interface)
	type: {
		type: String,
		default: null,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
});

const inputType = computed(() => {
	if (['bigInteger', 'integer', 'float', 'decimal'].includes(props.type)) return 'number';
	return 'text';
});

const { isCopySupported, copyToClipboard } = useClipboard();

const { useNotificationsStore } = useStores();
const notificationStore = useNotificationsStore();	

async function copyValue() {
	await copyToClipboard( (inputType.value === 'number') ? props.value.toString() : props.value as string, notificationStore);
};


const { computedLink } = useLink(props);

</script>


<style scoped lang="scss">
.action-interface {
	display: flex;
	flex-direction: row;
}
</style>
