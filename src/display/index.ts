import { defineDisplay, } from '@directus/extensions-sdk';
import DisplayComponent from './display.vue';
import { getSharedConfigOptions, getClickActionChoices } from '../shared/options/sharedConfigOptions';
import type { DeepPartial, AppField } from '@directus/types';

export default defineDisplay({
	id: 'field-actions',
	name: 'Action Display',
	icon: 'ads_click',
	description: 'Display content with linking and copy to clipboard options',
	component: DisplayComponent,
	types: ['uuid', 'string', 'text', 'bigInteger', 'integer', 'decimal', 'float'],
	group: 'standard',
	options: ({ field }): any => {
		const isString = ['string', 'text'].includes(field.type ?? 'unknown');

		const sharedOptions = getSharedConfigOptions(field, 'display');

		const customOptionsBeforeShared: DeepPartial<AppField>[] = [
			{
				field: 'hideFieldValue',
				name: 'Hide field value',
				type: 'boolean',
				meta: {
					width: 'full',
					interface: 'v-checkbox',
					note: 'When enabled the field value will be hidden. Can be used to only show the actions',
				},
				schema: {
					default_value: false,
				},
			},
			{
				field: 'clickAction',
				name: 'Click Action (when clicking on the value)',
				type: 'string',
				meta: {
					width: 'full',
					interface: 'select-dropdown',
					options: {
						choices: getClickActionChoices(isString),
					}
				},
				schema: {
					default_value: 'default',
				},
			},
		];

		const customOptionsAfterShared: DeepPartial<AppField>[] = [
			{
				field: 'copyButtonLabel',
				name: 'Copy button label',
				type: 'string',
				meta: {
					width: 'full',
					interface: 'system-input-translated-string',
					group: 'groupCopySettings',
					note: 'When used the copy icon will be shown as button with the given label',
				},
				schema: {
					default_value: '',
				},
			},
			{
				field: 'linkButtonLabel',
				name: 'Link button label',
				type: 'string',
				meta: {
					width: 'full',
					interface: 'system-input-translated-string',
					group: 'groupLinkSettings',
					note: 'When used the link icon will be shown as button with the given label',
				},
				schema: {
					default_value: '',
				},
			},
		];

		return [ ...customOptionsBeforeShared, ...sharedOptions, ...customOptionsAfterShared ];
	},
});

