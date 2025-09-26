import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';
import { getSharedConfigOptions, getClickActionChoices } from '../shared/options/sharedConfigOptions';
import type { DeepPartial, AppField } from '@directus/types';

export default defineInterface({
	id: 'field-actions',
	name: 'Action Interface',
	icon: 'ads_click',
	description: 'Display content with linking and copy to clipboard options',
	component: InterfaceComponent,
	types: ['string', 'uuid', 'text', 'bigInteger', 'integer', 'decimal', 'float'],
	group: 'standard',
	recommendedDisplays: ['field-actions'],
	options: ({ field }): any => {
		const isStringField 	= ['string', 'text'].includes(field.type ?? 'unknown');
		const isNumericField 	= ['bigInteger', 'integer', 'float', 'decimal'].includes(field.type ?? 'unknown');

		const sharedOptions = getSharedConfigOptions(field, 'interface');
		// TODO: add custom options: softLength, clear, font
		
		const interfaceOptions: DeepPartial<AppField>[] = [
			{
				field: 'placeholder',
				name: '$t:placeholder',
				meta: {
					width: 'half',
					interface: 'system-input-translated-string',
					options: {
						placeholder: '$t:enter_a_placeholder',
					},
				},
			},
			{
				field: 'iconLeft',
				name: '$t:icon_left',
				type: 'string',
				meta: {
					width: 'half',
					interface: 'select-icon',
				},
			},
			{
				field: 'iconRight',
				name: '$t:icon_right',
				type: 'string',
				meta: {
					width: 'half',
					interface: 'select-icon',
				},
			},
		];


		const readOnlyOptions: DeepPartial<AppField>[] = [
			{
				field: 'clickAction',
				name: 'Click Action (when clicking on the value)',
				type: 'string',
				meta: {
					width: 'full',
					interface: 'select-dropdown',
					options: {
						choices: getClickActionChoices(isStringField),
					}
				},
				schema: {
					default_value: 'default',
				},
			},
		];

		const numberOptions: DeepPartial<AppField>[] = [
			{
				field: 'min',
				name: '$t:interfaces.input.minimum_value',
				type: 'integer',
				meta: {
					width: 'half',
					interface: 'input',
				},
			},
			{
				field: 'max',
				name: '$t:interfaces.input.maximum_value',
				type: 'integer',
				meta: {
					width: 'half',
					interface: 'input',
				},
			},
			{
				field: 'step',
				name: '$t:interfaces.input.step_interval',
				type: 'integer',
				meta: {
					width: 'half',
					interface: 'input',
				},
				schema: {
					default_value: 1,
				},
			}
		];
	
	
		return [
			...interfaceOptions,
			...(isNumericField ? numberOptions : []),
			...(field.meta?.readonly ? readOnlyOptions : []),
			...sharedOptions,
		];
	},
});
