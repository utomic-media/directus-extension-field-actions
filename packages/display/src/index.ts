import { defineDisplay, } from '@directus/extensions-sdk';
import { DisplayConfig } from '@directus/shared/types';
import DisplayComponent from './display.vue';

export default defineDisplay({
	id: 'custom',
	name: 'Action display',
	icon: 'ads_click',
	description: 'Display content with actions line linking or copy to clipboard. (By clicking on the content (only at readonly) and seperate buttons)!',
	component: DisplayComponent,
	types: ['string', 'text', 'bigInteger', 'integer'],	// TODO: add decimal and float support!
	options: ({ field }): any => {
		const isString = ['string', 'text'].includes(field.type ?? 'unknown');
		
		
		const options: DisplayConfig['options'] = [
			// TODO: add other choices than 'other' only when isString===true, or phone if is numeric
			{
				field: 'contentType',
				name: 'Fields content type',
				type: 'string',
				meta: {
					width: 'full',
					interface: 'select-dropdown',
					options: {
						choices: [
							{
								text: 'Other',
								value: 'other',
							},
							{
								text: 'URL',
								value: 'url',
							},{
								text: 'Phone',
								value: 'phone',
							},
							{
								text: 'E-Mail',
								value: 'email',
							},
						],
					}
				},
				schema: {
					default_value: 'other',
				},
			},
			// TODO: allow "link" only if is string!
			{
				field: 'clickAction',
				name: 'Click Action (when clicking on the value)',
				type: 'string',
				meta: {
					width: 'full',
					interface: 'select-dropdown',
					options: {
						choices: [
							{
								text: 'Open element (default)',
								value: 'default',
							},
							{
								text: 'Open link',
								value: 'link',
							},{
								text: 'Copy to clipboard',
								value: 'copy',
							},
						],
					}
				},
				schema: {
					default_value: 'default',
				},
			},
			{
				field: 'showCopy',
				name: 'Display copy icon',
				type: 'boolean',
				meta: {
					width: 'full',
					interface: 'boolean',
					options: {
						label: 'Display a copy button next to the item',
					},
				},
				schema: {
					default_value: false,
				},
			},
			// TODO: allow option only when "contentType" is one of "phone, url or email"
			{
				field: 'showLink',
				name: 'Display link icon',
				type: 'boolean',
				meta: {
					width: 'full',
					interface: 'boolean',
					options: {
						label: 'Display a link button next to the item',
					},
				},
				schema: {
					default_value: false,
				},
			},
		];

		return options;
	},
});
