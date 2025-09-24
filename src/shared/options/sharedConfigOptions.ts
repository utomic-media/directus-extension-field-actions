import type { ExtensionOptionsContext } from '@directus/types';
import type { DeepPartial, AppField } from '@directus/types';
import type { RequiredProps } from '../types';

type ConfigTarget = 'display' | 'interface';

type CopyOptionsProps = {
  showCopy?: boolean;
  copyPosition?: 'start' | 'end';
  copyPrefix?: string;
  useCustomCopyTooltip?: boolean;
  customCopyTooltip?: string;
};

type LinkOptionsProps = {
  showLink?: boolean;
  linkPosition?: 'start' | 'end';
  linkPrefix?: string;
  useCustomLinkTooltip?: boolean;
  customLinkTooltip?: string;
  openLinkAsNewTab?: boolean;
  openLinkSafeMode?: 'never' | 'always';
};

export type SharedCopyOptionsProps = CopyOptionsProps & LinkOptionsProps;

const copyOptionsPropsDefaults: RequiredProps<CopyOptionsProps> = {
  showCopy: false,
  copyPosition: 'end',
  copyPrefix: '',
  useCustomCopyTooltip: false,
  customCopyTooltip: 'Copy value',
};

const linkOptionsPropsDefaults: RequiredProps<LinkOptionsProps> = {
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
    {
      field: 'groupCopySettingsEnabled',
      type: 'alias',
      meta: {
        field: 'groupCopySettingsEnabled', // NOTE: NEEDED FOR OTHER FIELDS TO REFERENCE THIS GROUP
        interface: 'group-raw',
        special: ['alias', 'no-data', 'group'],
        group: 'groupCopySettings',
        readonly: fieldConfigMatchesValue(field, configTarget, 'showCopy', false),
      },
    },
    {
      field: 'groupLinkSettingsEnabled',
      type: 'alias',
      meta: {
        field: 'groupLinkSettingsEnabled', // NOTE: NEEDED FOR OTHER FIELDS TO REFERENCE THIS GROUP
        interface: 'group-raw',
        special: ['alias', 'no-data', 'group'],
        group: 'groupLinkSettings',
        readonly: fieldConfigMatchesValue(field, configTarget, 'showLink', false),
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
        sort: 1,
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
        group: 'groupCopySettingsEnabled',
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
            { text: '{{ project_url }}', value: '{{ project_url }}' },
            { text: 'https://', value: 'https://' }
          ],
          allowOther: true,
          allowNone: true,
        },
        note: 'Copies the field value with the given prefix. Available variables: {{ project_url }}',
        group: 'groupCopySettingsEnabled',
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
        group: 'groupCopySettingsEnabled',
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
        group: 'groupCopySettingsEnabled',
        hidden: fieldConfigMatchesValue(field, configTarget, 'useCustomCopyTooltip', false),
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
        sort: 1,
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
        group: 'groupLinkSettingsEnabled',
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
            { text: '{{ project_url }}', value: '{{ project_url }}' },
            { text: 'Mail-Link (mailto:)', value: 'mailto:' },
            { text: 'Phone-Link (tel:)', value: 'tel:' },
            { text: 'https://', value: 'https://' }
          ],
          allowOther: true,
          allowNone: true,
        },
        note: 'Links to the field value with the given prefix. Available variables: {{ project_url }}',
        group: 'groupLinkSettingsEnabled',
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
        group: 'groupLinkSettingsEnabled',
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
        group: 'groupLinkSettingsEnabled',
        hidden: fieldConfigMatchesValue(field, configTarget, 'useCustomLinkTooltip', false),
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
        group: 'groupLinkSettingsEnabled',
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
        group: 'groupLinkSettingsEnabled',
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
 * Check if a certain config option of the field matches the expected value
 * 
 * @param field The field contextOptions
 * @param configTarget Switch between 'display' and 'interface' config options
 * @param optionsKey The field to watch
 * @param expectedValue The expected value of the target field 
 * 
 * @returns true, if the target field equals the expected value, else false
 */
function fieldConfigMatchesValue(field: ExtensionOptionsContext['field'], configTarget: ConfigTarget, optionsKey: string, expectedValue: any) {
  const options = configTarget === 'display' ? field.meta?.display_options : field.meta?.options;

  if ((options?.[optionsKey] ?? false) === expectedValue) {
    return true;
  }

  return false;
}
