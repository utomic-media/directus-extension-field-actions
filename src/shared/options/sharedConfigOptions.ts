import { DisplayConfig } from '@directus/shared/types';


export function getSharedConfigOptions(isString: boolean) {
  const options: DisplayConfig['options'] = [
    {
      field: 'groupCopySettings',
      name: 'Copy item settings',
      type: 'alias',
      meta: {
        field: 'groupCopySettings', // NOTE: NEEDED FOR OTHER FIELDS TO REFERENCE THIS GROUP
        interface: 'group-detail',
        special: ['alias', 'no-data', 'group'], // NOTE: NEEDED FOR ALIAS!
        options: {
          start: "closed",
          headerIcon: "content_copy",
        },
      },
    },
    {
      field: 'groupLinkSettings',
      name: 'Link item settings',
      type: 'alias',
      meta: {
        field: 'groupLinkSettings', // NOTE: NEEDED FOR OTHER FIELDS TO REFERENCE THIS GROUP
        interface: 'group-detail',
        special: ['alias', 'no-data', 'group'], // NOTE: NEEDED FOR ALIAS!
        options: {
          start: "closed",
          headerIcon: "open_in_new",
        },
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
        group: 'groupCopySettings',
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
        group: 'groupCopySettings',
      },
      schema: {
        default_value: 'end',
      },
    },
    {
      field: 'copyPrefix',
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
        note: 'Copies the field value with the given prefix',
        group: 'groupCopySettings',
      },
      schema: {
        default_value: '',
      },
    },
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
        group: 'groupLinkSettings',
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
        group: 'groupLinkSettings',
      },
      schema: {
        default_value: 'end',
      },
    },
    {
      field: 'linkPrefix',
      name: 'Link value prefix',
      type: 'string',
      meta: {
        width: 'half',
        interface: 'select-dropdown',
        options: {
          placeholder: 'Enter prefix or select variable',
          choices: [
            { text: '$project_url', value: '$project_url' },
            { text: 'Mail-Link (mailto:)', value: 'mailto:' },
            { text: 'Phole-Link (tel:)', value: 'tel:' },
            { text: 'https://', value: 'https://' }
          ],
          allowOther: true,
          allowNone: true,
        },
        note: 'Links to the field value with the given prefix',
        group: 'groupLinkSettings',
      },
      schema: {
        default_value: '',
      },
    },
    {
      field: 'openLinkAsNewTab',
      name: 'Link target',
      type: 'boolean',
      meta: {
        width: 'full',
        interface: 'select-radio',
        options: {
          choices: [
            { text: 'New Tab', value: true },
            { text: 'Current Tab', value: false }
          ],
        },
        group: 'groupLinkSettings',
      },
      schema: {
        default_value: true,
      },
    },
    {
      field: 'openLinkSafeMode',
      name: 'Warn before following external links',
      type: 'string',
      meta: {
        width: 'full',
        interface: 'select-radio',
        options: {
          choices: [
            { text: 'Never', value: 'never' },
            { text: 'Always', value: 'always' }
          ],
        },
        group: 'groupLinkSettings',
      },
      schema: {
        default_value: 'never',
      },
    },
  ];

  return options;
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
