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
			v-tooltip="value ? `Copy: ${prefix}${value}` : `Can't copy empty value`"
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
			v-tooltip="value ? `Follow link: ${prefix}${computedLink}` : `Can't follow empty link`"
			icon
			secondary
			xLarge
			:class="linkPosition === 'start' ? '-order-1' : 'order-1'"
		>
			<a 
				:href="computedLink"
				:target="openLinkAsNewTab ? '_blank' : '_self'"
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
import { usePrefix } from '../shared/composable/use-prefix';

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
  }
});

const emit = defineEmits(['input']);

const { isCopySupported, copyToClipboard } = useClipboard();

const { useNotificationsStore } = useStores();
const notificationStore = useNotificationsStore();	

const { computedLink } = useLink(props);
const prefix = usePrefix(props.copyPrefix);


const inputType = computed(() => {
	if (['bigInteger', 'integer', 'float', 'decimal'].includes(props.type)) return 'number';
	return 'text';
});


async function copyValue() {
	await copyToClipboard(`${prefix.value}${props.value}`, notificationStore);
};


// TODO: move in composable (together with display)
function valueClickAction(e: Event) {
	if (props.clickAction === 'copy' && props.disabled && props.value) {
		e.stopPropagation();
		copyValue();
	} 

	if (props.clickAction === 'link' && props.disabled && props.value) {
		e.stopPropagation();
		window.open(computedLink.value, '_blank', 'noopener, noreferrer');
	}
	
	// else go on with the default events
}


// TODO: move in composable (together with display)
const actionTooltip = computed(() => {
	if (props.clickAction === 'copy' && isCopySupported) return 'Copy value';
	if (props.clickAction === 'link') return 'Open link';
});

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
