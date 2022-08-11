import { defineDisplay, } from '@directus/extensions-sdk';
import DisplayComponent from './display.vue';
import { getSharedConfigOptions } from '../../../shared/options/sharedConfigOptions';

export default defineDisplay({
	id: 'custom',
	name: 'Action display',
	icon: 'ads_click',
	description: 'Display content with actions line linking or copy to clipboard. (By clicking on the content (only at readonly) and seperate buttons)!',
	component: DisplayComponent,
	types: ['string', 'text', 'bigInteger', 'integer', 'decimal', 'float'],
	options: ({ field  }): any => {
		const isString = ['string', 'text'].includes(field.type ?? 'unknown');

		const options = getSharedConfigOptions(isString);

		return options;
	},
});


