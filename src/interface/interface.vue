<!-- @see https://github.com/directus/directus/blob/main/app/src/interfaces/input/input.vue -->

<template>
	<div class="action-interface">
		<component 
			:is="(clickAction === 'link') ? linkWrapper : 'div'" 
			:href="computedLink"
			:target="openLinkAsNewTab ? '_blank' : '_self'"
			:safeMode="openLinkSafeMode === 'always'"
			class="dynamic-input-wrapper"
		>
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
		</component>

		<v-button
			v-if="showCopy && isCopySupported"
			:disabled="!value"
			v-tooltip="value ? `Copy: ${computedCopyValue}` : `Can't copy empty value`"
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
		

		<link-wrapper 
			:href="computedLink"
			:target="openLinkAsNewTab ? '_blank' : '_self'"
			:safeMode="openLinkSafeMode === 'always'"
			:class="linkPosition === 'start' ? '-order-1' : 'order-1'"
		>
			<v-button
				v-if="showLink"
				:disabled="!value"
				v-tooltip="value ? `Follow link: ${computedLink}` : `Can't follow empty link`"
				icon
				secondary
				xLarge
			>
				<v-icon 
					name="open_in_new"
				/>
			</v-button>
		</link-wrapper>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard } from '../shared/composable/use-clipboard';
import { usePrefixedValues } from '../shared/composable/use-prefixed-values';
import { useStores } from '@directus/extensions-sdk';
import linkWrapper from '../shared/components/linkWrapper.vue';

const props = defineProps({
	value: {
		type: [String, Number],
		default: null,
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
	copyPrefix: {
		type: String,
		default: '',
	},
	showLink: {
		type: Boolean,
		default: false,
	},
	linkPosition: {
		type: String,
		default: 'end',
	},
	linkPrefix: {
		type: String,
		default: '',
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
  openLinkAsNewTab: {
    type: Boolean,
    default: true
	},
	openLinkSafeMode: {
		type: String,
		default: 'never',
	},
});

const emit = defineEmits(['input']);

const { isCopySupported, copyToClipboard } = useClipboard();

const { useNotificationsStore } = useStores();
const notificationStore = useNotificationsStore();	

const { computedLink, computedCopyValue } = usePrefixedValues(props);


const inputType = computed(() => {
	if (['bigInteger', 'integer', 'float', 'decimal'].includes(props.type)) return 'number';
	return 'text';
});


async function copyValue() {
	await copyToClipboard(`${computedCopyValue.value}`, notificationStore);
};


// TODO: move in composable (together with display)
function valueClickAction(e: Event) {
	if (props.clickAction === 'copy' && props.disabled && props.value) {
		e.stopPropagation();
		copyValue();
	} 
	// else go on with the default events
}


// TODO: move in composable (together with display)
const actionTooltip = computed(() => {
	if (props.clickAction === 'copy' && isCopySupported) return 'Copy value';
	if (props.clickAction === 'link') return 'Open link';
});

</script>




<style lang="scss">
	// !NOTE: GLOBAL STYLES - use scoped styles for the component whenever possible!
	.action-interface {
		.v-input {
			
			input:disabled {
				/* disable click events on disabled inputs, so that the click event can be handled by the parent div
			 	 * For some reason we can't go with a normal :deep() selector in the scoped stye
				*/
				pointer-events: none;
			}
		}
	}
</style>


<style scoped lang="scss">
.action-interface {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap:8px;

	.dynamic-input-wrapper {
		width: 100%;
	}

	>div {
		display: inherit;

		&.order-1 {
			order: 1;
		}

		&.-order-1 {
			order: -1;
		}
	}
}
</style>
