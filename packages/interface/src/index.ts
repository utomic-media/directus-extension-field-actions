import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';
import { getSharedConfigOptions } from '../../../shared/options/sharedConfigOptions';

export default defineInterface({
	id: 'custom',
	name: 'Action interface',
	icon: 'ads_click',
	description: 'Display content with actions like linking or copy to clipboard. (By clicking on the content (only at readonly) and seperate buttons)! NOTE: the content needs to match the schema',
	component: InterfaceComponent,
	types: ['string', 'text', 'bigInteger', 'integer', 'decimal', 'float'],
	options: ({ field  }): any => {
		const isString = ['string', 'text'].includes(field.type ?? 'unknown');

		const options = getSharedConfigOptions(isString);

		return options;
	},
});
