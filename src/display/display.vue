<template>
	<value-null v-if="!value" />
	<span v-else class="action-display">
		<!-- NOTE: @click.stop to prevent the opening of item page -->
		<component
			v-if="!hideFieldValue"
			:is="(clickAction === 'link') ? linkWrapper : 'span'" 
			v-tooltip.left="actionTooltip"
			:href="computedLink"
			:target="openLinkAsNewTab ? '_blank' : '_self'"
			:safeMode="openLinkSafeMode === 'always'"
			@click.stop
		>
			<span 
				:class="hasValueClickAction ? 'action-background' : ''"
				@click="valueClickAction"
			>
				{{ value }}
			</span>
		</component>
		
		<component
			v-if="showCopy && isCopySupported"
			:is="(copyButtonLabel) ? 'v-button' : 'span'" 
			outlined
			xSmall
			:class="copyPosition === 'start' ? '-order-1' : 'order-1'"
			v-tooltip="`Copy: ${computedCopyValue}`"
			@click.stop="copyValue"
		>
			<v-icon 
				name="content_copy"
				:color="copyButtonLabel ? 'primary' : ''"
			/>

			<span v-if="copyButtonLabel" class="ml-2">{{ copyButtonLabel }}</span>
		</component>
		

		<!-- NOTE: @click.stop to prevent the opening of item page -->
		<link-wrapper
			v-if="showLink"
			:href="computedLink"
			:target="openLinkAsNewTab ? '_blank' : '_self'"
			:safeMode="openLinkSafeMode === 'always'"
			:class="linkPosition === 'start' ? '-order-1' : 'order-1'"
			@click.stop
		>
			<component
				:is="(linkButtonLabel) ? 'v-button' : 'div'" 
				outlined
				xSmall
				v-tooltip="`Follow link: ${computedLink}`"
			>
				<v-icon 
					name="open_in_new"
					:color="linkButtonLabel ? 'primary' : ''"
				/>
				<span v-if="linkButtonLabel" class="ml-2">{{ linkButtonLabel }}</span>
			</component>
		</link-wrapper>
	</span>
</template>




<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard } from '../shared/composable/use-clipboard';
import { usePrefixedValues } from '../shared/composable/use-prefixed-values';
import { useStores } from '@directus/extensions-sdk';
import linkWrapper from '../shared/components/linkWrapper.vue';

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
	hideFieldValue: {
		type: Boolean,
		default: false,
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
	copyButtonLabel: {
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
	linkButtonLabel: {
		type: String,
		default: '',
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


const { isCopySupported, copyToClipboard } = useClipboard();

const { useNotificationsStore } = useStores();
const notificationStore = useNotificationsStore();	

const { computedLink, computedCopyValue } = usePrefixedValues(props);


async function copyValue() {
	await copyToClipboard(computedCopyValue.value, notificationStore);
};


// TODO: move in composable (together with display)
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
		gap: 8px;

		span,
		a,
		div {
			display: inherit;

			&.order-1 {
				order: 1;
			}

			&.-order-1 {
				order: -1;
			}
		}

		.ml-2 {
			margin-left: 0.5rem;
		}

		:deep(.v-icon) {
			--v-icon-size: 18px;
			--v-icon-color: var(--theme--foreground-subdued);

			&:hover {
				--v-icon-color: var(--theme--primary);
			}
		}

		.action-background {
			background-color: var(--theme--primary-background);
			color: var(--theme--primary);
			padding: 0.5rem 1rem;
    	border-radius: 5rem; /* arbitrary value for a nice smooth rounding */

			&:hover {
				background-color: color-mix(in srgb, var(--theme--background), var(--theme--primary) 25%); // like --theme--primary-background but with 25%
			}
		}
	}
	
</style>
