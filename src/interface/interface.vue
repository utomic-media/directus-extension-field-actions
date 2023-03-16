<!-- @see https://github.com/directus/directus/blob/main/app/src/interfaces/input/input.vue -->

<template>
	<div class="action-interface">
		<v-input
			:model-value="value"
			:disabled="disabled"
			:type="inputType"
			:placeholder="placeholder"
			:min="min"
			:max="max"
			:step="step"
			v-tooltip="actionTooltip"
			@update:model-value="$emit('input', $event)"
			@click="valueClickAction"
		>
			<template v-if="iconLeft" #prepend>
				<v-icon :name="iconLeft" />
			</template>

			<template v-if="iconRight" #append>
				<v-icon :name="iconRight" />
			</template>
		</v-input>

		<v-button
			v-if="showCopy && isCopySupported"
			:disabled="!value"
			v-tooltip="value ? `Copy to clipboard: ${value}` : `Can't copy empty value`"
			icon
			secondary
			xLarge
			:class="copyPosition === 'start' ? '-order-1' : 'order-1'"
		>
			<v-icon
				name="content_copy"
				@click.stop="copyValue"
			/>
		</v-button>


		<!-- TODO: button supports :to=routerLink and :href=custom link. Switch from custom a-tag to those. Use condition: href for full url and "to" for internal links (incomplete url)  -->
		<v-button
			v-if="showLink"
			:disabled="!value"
			v-tooltip="value ? `Follow link: ${computedLink}` : `Can't follow empty link`"
			icon
			secondary
			xLarge
			:class="linkPosition === 'start' ? '-order-1' : 'order-1'"
		>
			<a
				:href="computedLink"
				target="_blank"
				rel="noopener noreferrer"
				@click.stop
			>
				<v-icon
					name="open_in_new"
				/>
			</a>
		</v-button>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard } from '../shared/composable/use-clipboard';
import { useLink } from '../shared/composable/use-link';
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
	clickAction: {
		type: String,
		default: 'default',
	},
	showCopy: {
		type: Boolean,
		default: false,
	},
	copyPosition: {
		type: String,
		default: 'end',
	},
	showLink: {
		type: Boolean,
		default: false,
	},
	linkPosition: {
		type: String,
		default: 'end',
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
	prependProjectUrl: {
		type: Boolean,
		default: false,
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

const emit = defineEmits(['input'])

const inputType = computed(() => {
	if (['bigInteger', 'integer', 'float', 'decimal'].includes(props.type)) return 'number';
	return 'text';
});

// TODO: move in composable (together with display)
const actionTooltip = computed(() => {
	if (props.clickAction === 'copy' && isCopySupported) return 'Copy value';
	if (props.clickAction === 'link') return 'Open link';
});

const { computedLink } = useLink(props);

const { isCopySupported, copyToClipboard } = useClipboard();
const { useNotificationsStore } = useStores();
const notificationStore = useNotificationsStore();

async function copyValue() {
	await copyToClipboard( (inputType.value === 'number') ? props.value.toString() : props.value as string, notificationStore);
};

// TODO: move in composable (together with display)
function valueClickAction(e: Event) {
	if (props.clickAction === 'copy' && props.disabled && props.value) {
		e.stopPropagation();
		copyValue();
	}
	// else go on with the default events
}

</script>




<style scoped lang="scss">
.action-interface {
	display: flex;
	flex-direction: row;
	align-items: center;

	>div {
		display: inherit;

		&.order-1 {
			order: 1;
			margin-left: 8px;
		}

		&.-order-1 {
			order: -1;
			margin-right: 8px;
		}
	}
}
</style>
