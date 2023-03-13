import { defineDisplay, } from '@directus/extensions-sdk';
import DisplayComponent from './display.vue';
import { getSharedConfigOptions, getClickActionChoices } from '../shared/options/sharedConfigOptions';

export default defineDisplay({
	id: 'custom',
	name: 'Action display',
	icon: 'ads_click',
	description: 'Display content with actions like linking or copy to clipboard. (By clicking on the content (only at readonly) and seperate buttons)! NOTE: the content needs to match the schema',
	component: DisplayComponent,
	types: ['uuid', 'string', 'text', 'bigInteger', 'integer', 'decimal', 'float'],
	options: ({ field  }): any => {
		const isString = ['string', 'text'].includes(field.type ?? 'unknown');

		const sharedOptions = getSharedConfigOptions(isString);

		const customOptions = [
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

		return [...sharedOptions, ...customOptions ];
	},
});

