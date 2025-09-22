import type { ExtensionOptionsContext } from '@directus/types';
import type { DeepPartial, AppField } from '@directus/types';

type ConfigTarget = 'display' | 'interface';

type CopyOptionsProps = {
  showCopy: boolean;
  copyPosition: 'start' | 'end';
  copyPrefix: string;
  useCustomCopyTooltip: boolean;
  customCopyTooltip: string;
};

type LinkOptionsProps = {
  showLink: boolean;
  linkPosition: 'start' | 'end';
  linkPrefix: string;
  useCustomLinkTooltip: boolean;
  customLinkTooltip: string;
  openLinkAsNewTab: boolean;
  openLinkSafeMode: 'never' | 'always';
}

export type SharedCopyOptionsProps = CopyOptionsProps & LinkOptionsProps;

const copyOptionsPropsDefaults: CopyOptionsProps = {
  showCopy: false,
  copyPosition: 'end',
  copyPrefix: '',
  useCustomCopyTooltip: false,
  customCopyTooltip: 'Copy value',
};

const linkOptionsPropsDefaults: LinkOptionsProps = {
  showLink: false,
  linkPosition: 'end',
  linkPrefix: '',
  useCustomLinkTooltip: false,
  customLinkTooltip: 'Open link',
  openLinkAsNewTab: true,
  openLinkSafeMode: 'never',
};

export const sharedOptionsPropsDefaults: SharedCopyOptionsProps = {
  ...copyOptionsPropsDefaults,
  ...linkOptionsPropsDefaults,
};


export function getSharedConfigOptions(field: ExtensionOptionsContext['field'], configTarget: ConfigTarget): DeepPartial<AppField>[] {
  const groups: DeepPartial<AppField>[] = [
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
  ];

  const copyOptions: DeepPartial<Omit<AppField, 'field'> & { field: keyof CopyOptionsProps }>[] = [
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
      field: 'useCustomCopyTooltip',
      name: 'Custom Tooltip',
      type: 'boolean',
      meta: {
        width: 'half',
        interface: 'boolean',
        options: {
          label: 'Enable',
        },
        note: 'Use a custom tooltip for the copy button',
        group: 'groupCopySettings',
      },
      schema: {
        default_value: false,
      },
    },
    {
      field: 'customCopyTooltip',
      name: 'Tooltip content',
      type: 'string',
      meta: {
        width: 'half',
        interface: 'system-input-translated-string',
        group: 'groupCopySettings',
        hidden: hideBasedOnOtherField(field, configTarget, 'useCustomCopyTooltip', true),
      },
      schema: {
        default_value: 'Copy value',
      },
    },
  ];
  
  const linkOptions: DeepPartial<Omit<AppField, 'field'> & { field: keyof LinkOptionsProps }>[] = [
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
      field: 'useCustomLinkTooltip',
      name: 'Custom Tooltip',
      type: 'boolean',
      meta: {
        width: 'half',
        interface: 'boolean',
        options: {
          label: 'Enable',
        },
        note: 'Use a custom tooltip for the link button',
        group: 'groupLinkSettings',
      },
      schema: {
        default_value: false,
      },
    },
    {
      field: 'customLinkTooltip',
      name: 'Tooltip content',
      type: 'string',
      meta: {
        width: 'half',
        interface: 'system-input-translated-string',
        group: 'groupLinkSettings',
        hidden: hideBasedOnOtherField(field, configTarget, 'useCustomLinkTooltip', true),
      },
      schema: {
        default_value: 'Open link',
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

  return [...groups, ...copyOptions, ...linkOptions];
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


/**
 * Conditionally show/hide a field based on another field's value
 * 
 * @param field The field contextOptions
 * @param configTarget Switch between 'display' and 'interface' config options
 * @param targetField The field to watch
 * @param showIfValue The expected value of the target field to show the current field
 * 
 * @returns true, if the target field equals the expected value, else false
 */
function hideBasedOnOtherField(field: ExtensionOptionsContext['field'], configTarget: ConfigTarget, targetField: string, showIfValue: any) {
  const options = configTarget === 'display' ? field.meta?.display_options : field.meta?.options;

  if (options?.[targetField] === showIfValue) {
    return false; // don't hide field
  }

  return true; // hide field
}
