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
    }, {
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
function getClickActionChoices(isString: boolean) {
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