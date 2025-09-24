<template>
	<value-null v-if="!value" />
	
	<span v-else class="defa-action-display">
		<click-action-wrapper
			v-if="!hideFieldValue"
			:click-action="clickAction"
			:computed-link="computedLink"
			:open-link-as-new-tab="openLinkAsNewTab"
			:open-link-safe-mode="openLinkSafeMode"
			:action-tooltip="actionTooltip"
			:disabled="true"
			@copy="copyValue"
		>
			<span 
				:class="hasValueClickAction ? 'defa-action-background' : ''"
			>
				<v-text-overflow :text="value" />
			</span>
		</click-action-wrapper>
		
		<component
			v-if="showCopy"
			:disabled="!value || !isCopySupported"
			:is="(copyButtonLabel) ? 'v-button' : 'span'" 
			outlined
			xSmall
			:class="copyPosition === 'start' ? '-defa-order-1' : 'defa-order-1'"
			v-tooltip="copyTooltip"
			@click.stop="copyValue"
			data-testid="copy-button"
		>
			<v-icon 
				name="content_copy"
				:color="copyButtonLabel ? 'primary' : ''"
			/>

			<span v-if="copyButtonLabel" class="defa-ml-2">{{ copyButtonLabel }}</span>
		</component>
		

		<!-- NOTE: @click.stop to prevent the opening of item page -->
		<link-wrapper
			v-if="showLink"
			:href="computedLink"
			:target="openLinkAsNewTab ? '_blank' : '_self'"
			:safeMode="openLinkSafeMode === 'always'"
			:class="linkPosition === 'start' ? '-defa-order-1' : 'defa-order-1'"
			@click.stop
		>
			<component
				:is="(linkButtonLabel) ? 'v-button' : 'div'" 
				outlined
				xSmall
				v-tooltip="linkTooltip"
				data-testid="link-button"
			>
				<v-icon 
					name="open_in_new"
					:color="linkButtonLabel ? 'primary' : ''"
				/>
				<span v-if="linkButtonLabel" class="defa-ml-2">{{ linkButtonLabel }}</span>
			</component>
		</link-wrapper>
	</span>
</template>




<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard } from '../shared/composable/use-clipboard';
import { usePrefixedValues } from '../shared/composable/use-prefixed-values';
import LinkWrapper from '../shared/components/LinkWrapper.vue';
import ClickActionWrapper from '../shared/components/clickActionWrapper.vue';
import { useTooltips } from '../shared/composable/use-tooltips';
import { useAppTranslations } from '../shared/composable/useAppTranslations';
import { sharedOptionsPropsDefaults } from '../shared/options/sharedConfigOptions';
import type { ClickAction } from '../shared/types';
import type { SharedCopyOptionsProps } from '../shared/options/sharedConfigOptions';

const props = withDefaults(defineProps<{
	// Directus default props
	value?: string | null;
	type: string;

	// customOptionsBeforeShared
	hideFieldValue?: boolean;
	clickAction?: ClickAction;

	// customOptionsAfterShared
	copyButtonLabel?: string | null;
	linkButtonLabel?: string | null;
} & SharedCopyOptionsProps>(), {
	// Directus default props
	value: null,

	// customOptionsBeforeShared
	hideFieldValue: false,
	clickAction: 'default',
	

	// SharedOptions
	...sharedOptionsPropsDefaults,

	// customOptionsAfterShared
	copyButtonLabel: null,
	linkButtonLabel: null,
});

useAppTranslations().loadLocaleMessages();

const { isCopySupported, copyToClipboard } = useClipboard();
const { computedLink, computedCopyValue } = usePrefixedValues(props);

const { copyTooltip, linkTooltip, actionTooltip } = useTooltips({
	clickAction: props.clickAction,
	useCustomCopyTooltip: props.useCustomCopyTooltip,
	customCopyTooltip: props.customCopyTooltip,
	useCustomLinkTooltip: props.useCustomLinkTooltip,
	customLinkTooltip: props.customLinkTooltip,
});

async function copyValue() {
	await copyToClipboard(computedCopyValue.value);
};

const hasValueClickAction = computed(() => {
	if (props.clickAction === 'default') return false;
	if (props.clickAction === 'copy' && isCopySupported) return true;
	if (props.clickAction === 'link') return true;

	return false;
});
</script>


<style lang="scss">
	// NOTE: GLOBAL STYLES
	// use scoped styles for the component whenever possible!

	.header-bar .title-container {
		// if the display is in the header bar title we need extra styling, as it has a fixed height
		.defa-action-display {
			.defa-action-background {
				line-height: 2rem;
				padding-top: 0;
				padding-bottom: 0;
			}
		}
	}

	// if the display is in the render template we need to use flex on it
	// NOTE: this could be optimized, as this way the default "text-overflow: ellapsis" from directus is not working, but it should be fine for 98% of the use-cases
	.render-template:has(.defa-action-display) {
		display: flex;
		align-items: center;
	}
</style>

<style scoped lang="scss">
	.defa-action-display {
		display: inline-flex;
    flex-direction: row;
    align-items: center;
		gap: 8px;
		width: 100%;

		span,
		a,
		div {
			display: inherit;

			&.defa-order-1 {
				order: 1;
			}

			&.-defa-order-1 {
				order: -1;
			}
		}

		.defa-ml-2 {
			margin-left: 0.5rem;
		}

		:deep(.v-icon) {
			--v-icon-size: 18px;
			--v-icon-color: var(--theme--foreground-subdued);

			&:hover {
				--v-icon-color: var(--theme--primary);
			}
		}

		.defa-click-action-wrapper {
			flex-grow: 1;
			min-width: 0;
			max-width: fit-content;
		}

		.defa-action-background {
			background-color: var(--theme--primary-background);
			color: var(--theme--primary);
			padding: 0.5rem 1rem;
    	border-radius: 5rem; /* arbitrary value for a nice smooth rounding */

			&:hover {
				background-color: color-mix(in srgb, var(--theme--background), var(--theme--primary) 25%); /* like --theme--primary-background but with 25% */
			}
		}
	}
	
</style>
