<template>
	<value-null v-if="!value" />
	<span v-else class="action-display">
		<component
			:is="(clickAction === 'link') ? 'a' : 'span'" 
			class="dynamic-wrapper"
			:href="computedLink"
			v-tooltip.left="actionTooltip"
			target="_blank"
			rel="noopener noreferrer"
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
			v-tooltip="`Copy: ${prefix}${value}`"
			@click.stop="copyValue"
			:class="copyPosition === 'start' ? '-order-1' : 'order-1'"
		/>
		

		<a 
			v-if="showLink"
			:href="computedLink"
			target="_blank"
			rel="noopener noreferrer"
			v-tooltip="`Follow link: ${prefix}${computedLink}`"
			@click.stop
			:class="linkPosition === 'start' ? '-order-1' : 'order-1'"
		>
			<v-icon 
				name="open_in_new"
			/>
		</a>
	</span>
</template>




<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard } from '../shared/composable/use-clipboard';
import { useLink } from '../shared/composable/use-link';
import { usePrefix } from '../shared/composable/use-prefix';
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
});


const { isCopySupported, copyToClipboard } = useClipboard();

const { useNotificationsStore } = useStores();
const notificationStore = useNotificationsStore();	

const { computedLink } = useLink(props);
const prefix = usePrefix(props.copyPrefix);


async function copyValue() {
	await copyToClipboard(`${prefix.value}${props.value}`, notificationStore);
};


// TODO: move in composable (together with display)
function valueClickAction(e: Event) {
	if (props.clickAction === 'copy') {
		e.stopPropagation();
		copyValue();
	} 

	if (props.clickAction === 'link') {
		// We opened a link in a new tab and don't want to get into the details view of the item
		e.stopPropagation();
	}
	// else go on with the default events
}


const hasValueClickAction = computed(() => {
	if (props.clickAction === 'default') return false;
	if (props.clickAction === 'copy' && isCopySupported) return true;
	if (props.clickAction === 'link') return true;

	return false;
});


// TODO: move in composable (together with display)
const actionTooltip = computed(() => {
	if (props.clickAction === 'copy' && isCopySupported) return 'Copy value';
	if (props.clickAction === 'link') return 'Open link';
});

</script>


<style lang="scss">
	// NOTE: GLOBAL STYLES
	// use scoped styles for the component whenever possible!

	.header-bar .title-container {
		// if the display is in the header bar title we need extra styling, as it has a fixed height
		.action-display {
			.action-background {
				line-height: 2rem;
				padding-top: 0;
				padding-bottom: 0;
			}
		}
	}

	// if the display is in the render template we need to use flex on it
	// NOTE: this could be optimized, as this way the default "text-overflow: ellapsis" from directus is not working, but it should be fine for 98% of the use-cases
	.render-template:has(.action-display) {
		display: flex;
		align-items: center;
	}
</style>

<style scoped lang="scss">
	.action-display {
		display: inline-flex;
    flex-direction: row;
    align-items: center;

		span,
		a {
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

		:deep(.v-icon) {
			--v-icon-size: 18px;
			--v-icon-color: var(--border-normal-alt);

			&:hover {
				--v-icon-color: var(--primary);
			}
		}

		.action-background {
			background-color: var(--primary-10);
			color: var(--primary);
			padding: 0.5rem 1rem;
    	border-radius: 5rem; /* arbitrary value for a nice smooth rounding */

			&:hover {
				background-color: var(--primary-25);
			}
		}
	}
	
</style>