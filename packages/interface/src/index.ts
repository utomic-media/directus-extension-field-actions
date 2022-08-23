import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';
import { getSharedConfigOptions, getClickActionChoices } from '../../../shared/options/sharedConfigOptions';

export default defineInterface({
	id: 'custom',
	name: 'Action interface',
	icon: 'ads_click',
	description: 'Display content with actions like linking or copy to clipboard. (By clicking on the content (only at readonly) and seperate buttons)! NOTE: the content needs to match the schema',
	component: InterfaceComponent,
	types: ['string', 'text', 'bigInteger', 'integer', 'decimal', 'float'],
	options: ({ field  }): any => {
		const isString = ['string', 'text'].includes(field.type ?? 'unknown');
		

		const sharedOptions = getSharedConfigOptions(isString);
		// TODO: add custom options:  iconLeft, iconRight, softLength, clear, font
		
		const interfaceOptions = [
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


		const readOnlyOptions = [
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

		const numberOptions = [
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


		if (field.type && ['bigInteger', 'integer', 'float', 'decimal'].includes(field.type)) {
			const allOptions = [...interfaceOptions, ...numberOptions, ...sharedOptions ];
			if (field.meta?.readonly) allOptions.push(...readOnlyOptions);
			
			return allOptions;
		}
	

		const allOptions = [...interfaceOptions, ...sharedOptions];
		if (field.meta?.readonly) allOptions.push(...readOnlyOptions);
		
		return allOptions;
	},
});
