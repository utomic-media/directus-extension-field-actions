<template>
	<div class="defa-action-interface">
		<click-action-wrapper
			:click-action="clickAction"
			:computed-link="computedLink"
			:open-link-as-new-tab="openLinkAsNewTab"
			:open-link-safe-mode="openLinkSafeMode"
			:action-tooltip="actionTooltip"
			:disabled="disabled"
			@copy="copyValue"
		>
			<v-input 
				:model-value="value" 
				:disabled="disabled"
				:type="inputType"
				:placeholder="placeholder"
				:min="min"
				:max="max"
				:step="step"
				@update:model-value="$emit('input', $event)"
			>
				<template v-if="iconLeft" #prepend>
					<v-icon :name="iconLeft" />
				</template>

				<template v-if="iconRight" #append>
					<v-icon :name="iconRight" />
				</template>
			</v-input>
		</click-action-wrapper>

		<v-button
			v-if="showCopy"
			:disabled="!value || !isCopySupported"
			v-tooltip="copyTooltip"
			icon
			secondary
			xLarge
			data-testid="copy-button"
			:class="copyPosition === 'start' ? '-defa-order-1' : 'defa-order-1'"
		>
			<v-icon
				name="content_copy"
				@click.stop="copyValue"
			/>
		</v-button>
		

		<link-wrapper
			v-if="showLink"
			:href="computedLink"
			:target="openLinkAsNewTab ? '_blank' : '_self'"
			:safeMode="openLinkSafeMode === 'always'"
			:class="linkPosition === 'start' ? '-defa-order-1' : 'defa-order-1'"
		>
			<v-button
				:disabled="!value"
				v-tooltip="linkTooltip"
				icon
				secondary
				xLarge
				data-testid="link-button"
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
import LinkWrapper from '../shared/components/LinkWrapper.vue';
import ClickActionWrapper from '../shared/components/ClickActionWrapper.vue';
import { useTooltips } from '../shared/composable/use-tooltips';
import { useAppTranslations } from '../shared/composable/useAppTranslations';
import { sharedOptionsPropsDefaults } from '../shared/options/sharedConfigOptions';
import type { ClickAction } from '../shared/types';
import type { SharedCopyOptionsProps } from '../shared/options/sharedConfigOptions';

const props = withDefaults(defineProps<{
	// Directus default props
	value?: string | number | null;
	type: string;
	disabled?: boolean;

	// interfaceOptions
	placeholder?: string | null;
	iconLeft?: string | null;
	iconRight?: string | null;

	// readOnlyOptions
	clickAction?: ClickAction;

	// numberOptions
	min?: number | undefined;
	max?: number | undefined;
	step?: number;
} & SharedCopyOptionsProps>(), {
	// Directus default props
	value: null,
	disabled: false,

	// interfaceOptions
	placeholder: null,
	iconLeft: null,
	iconRight: null,

	// readOnlyOptions
	clickAction: 'default',

	// numberOptions
	min: undefined,
	max: undefined,
	step: 1,

	// SharedOptions
	...sharedOptionsPropsDefaults,
});

const emit = defineEmits(['input']);

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

const inputType = computed(() => {
	if (['bigInteger', 'integer', 'float', 'decimal'].includes(props.type)) {
		return 'number';
	}
	return 'text';
});

async function copyValue() {
	await copyToClipboard(`${computedCopyValue.value}`);
};
</script>




<style lang="scss">
	// !NOTE: GLOBAL STYLES - use scoped styles for the component whenever possible!
	.defa-action-interface {
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
.defa-action-interface {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap:8px;

	.defa-click-action-wrapper {
		width: 100%;
	}

	>div {
		display: inherit;

		&.defa-order-1 {
			order: 1;
		}

		&.-defa-order-1 {
			order: -1;
		}
	}
}
</style>
