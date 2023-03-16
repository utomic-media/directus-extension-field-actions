import { DisplayConfig } from '@directus/shared/types';


export function getSharedConfigOptions(isString: boolean) {
  const options: DisplayConfig['options'] = [
    {
      field: 'contentType',
      name: 'Fields content type',
      type: 'string',
      meta: {
        width: 'full',
        interface: 'select-dropdown',
        options: {
          choices: getContentTypeChoices(isString),
        }
      },
      schema: {
        default_value: 'other',
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
    {
      field: 'copyPosition',
      name: 'Copy icon position',
      type: 'string',
      meta: {
        width: 'half',
        interface: 'select-radio',
        options: {
          choices: [
            { text: 'Start', value: 'start' },
            { text: 'End', value: 'end' }
          ],
        },
      },
      schema: {
        default_value: 'end',
      },
    },
    {
      field: 'copyPrefix',
      name: 'Link value prefix',
      type: 'string',
      meta: {
        width: 'half',
        interface: 'select-dropdown',
        options: {
          placeholder: 'Enter prefix or select variable',
          choices: [
            { text: '$project_url', value: '$project_url' },
            { text: 'https://', value: 'https://' }
          ],
          allowOther: true,
          allowNone: true,
        },

      },
      schema: {
        default_value: '',
      },
    },
    // TODO: allow option only when "contentType" is one of "phone, url or email" --> and set true in this cases
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
    {
      field: 'linkPosition',
      name: 'Link icon position',
      type: 'string',
      meta: {
        width: 'half',
        interface: 'select-radio',
        options: {
          choices: [
            { text: 'Start', value: 'start' },
            { text: 'End', value: 'end' }
          ],
        },
      },
      schema: {
        default_value: 'end',
      },
    },
    {
      field: 'linkPrefix',
      name: 'Copy value prefix',
      type: 'string',
      meta: {
        width: 'half',
        interface: 'select-dropdown',
        options: {
          placeholder: 'Enter prefix or select variable',
          choices: [
            { text: '$project_url', value: '$project_url' },
            { text: 'https://', value: 'https://' }
          ],
          allowOther: true,
          allowNone: true,
        },

      },
      schema: {
        default_value: '',
      },
    },
  ];

  return options;
}


function getContentTypeChoices(isString: boolean) {
	const selectChoices = [
		{
			text: 'Other',
			value: 'other',
		},
		{
			text: 'Phone',
			value: 'phone',
		},
	];

	if (isString) {
		selectChoices.push(
			{
				text: 'URL',
				value: 'url',
			},
			{
				text: 'E-Mail',
				value: 'email',
			},
		);
	}

	return selectChoices;
}



// dynamically build push Options
// TODO: allow link only if phone, url or mail is selected
export function getClickActionChoices(isString: boolean) {
	const selectChoices = [
		{
			text: 'Copy to clipboard',
			value: 'copy',
		},{
			text: 'Default click action',
			value: 'default',
		},
	];

	if (isString) {
		selectChoices.push(
			{
				text: 'Open link',
				value: 'link',
			},
		);
	}

	return selectChoices;
}