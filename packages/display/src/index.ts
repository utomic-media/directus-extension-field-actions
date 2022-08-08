import { defineDisplay } from '@directus/extensions-sdk';
import DisplayComponent from './display.vue';

export default defineDisplay({
	id: 'custom',
	name: 'Action display',
	icon: 'ads_click',
	description: 'Display content with actions line linking or copy to clipboard. (By clicking on the content (only at readonly) and seperate buttons)!',
	component: DisplayComponent,
	options: null,
	types: ['string', 'text', 'bigInteger', 'integer'],
});
