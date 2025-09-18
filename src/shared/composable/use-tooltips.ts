import { computed } from 'vue';
import { useClipboard } from './use-clipboard';
import { useI18n } from 'vue-i18n';
import type { ClickAction } from '../types';

type Options = {
  clickAction: ClickAction;
  useCustomCopyTooltip: boolean | null;
  customCopyTooltip: string | null;
  useCustomLinkTooltip: boolean | null;
  customLinkTooltip: string | null;
};


export function useTooltips(options: Options) { 
  const { isCopySupported } = useClipboard();
  const { t } = useI18n();

  const copyTooltip = computed(() => {
    if (isCopySupported.value === false) {
      return t('field_actions.copy_not_supported');
    }

    if (options.useCustomCopyTooltip) {
      return options.customCopyTooltip;
    }

    return t('field_actions.copy_value');
  });


  const linkTooltip = computed(() => {
    if (options.useCustomLinkTooltip) {
      return options.customLinkTooltip;
    }

    return t('field_actions.open_link');
  });


  const actionTooltip = computed(() => {
    if (options.clickAction === 'copy') {
      return copyTooltip.value;
    }

    if (options.clickAction === 'link') {
      return linkTooltip.value;
    }

    return null;
  });


  return {
    copyTooltip,
    linkTooltip,
    actionTooltip
  };
}

